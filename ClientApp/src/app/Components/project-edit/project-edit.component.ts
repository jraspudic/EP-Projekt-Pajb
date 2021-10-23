import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { Subscription } from 'rxjs';
import { ProjectTaskPost } from 'src/app/Models/ProjectTaskPost.model';
import { User } from 'src/app/Models/User.model';
import { ProjectTaskService } from 'src/app/Services/project-task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [CheckBoxSelectionService, DateRangePickerModule],
})
export class ProjectEditComponent implements OnInit {
  constructor(
    private userService: UserService,
    private projectTaskService: ProjectTaskService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  users: User[] = [];

  projectData: ProjectTaskPost = new ProjectTaskPost(
    null,
    null,
    null,
    null,
    null,
    '0'
  );

  dateRangeValue: any;
  routeSub: Subscription;
  id: string;

  ngOnInit(): void {
    if (!this.projectTaskService.editedProject) {
      this.router.navigateByUrl('');
    }

    this.routeSub = this.route.params.subscribe(
      (params) => {
        this.id = params['id'];
        console.log('id je: ');
        console.log(this.id);
      },
      (err) => {
        console.log(err);
      }
    );

    this.userService.getUsers().subscribe((data) => {
      console.log('Users data stigo:');
      console.log(data);
      this.users = data.users;
      this.formatUsers();
    });

    this.projectData.name = this.projectTaskService.editedProject.name;
    this.projectData.note = this.projectTaskService.editedProject.note;
    this.projectData.users = [];
    this.projectTaskService.editedProject.users.forEach((user) => {
      this.projectData.users.push(user._id);
    });

    this.dateRangeValue = [
      this.projectTaskService.editedProject.startDate,
      this.projectTaskService.editedProject.endDate,
    ];
  }

  formatUsers() {
    this.users.forEach((user) => {
      user.fullName = user.firstName + ' ' + user.lastName;
    });
  }

  onSave() {
    console.log(this.dateRangeValue);
    this.projectData.startDate = this.dateRangeValue[0]?.toISOString();
    this.projectData.endDate = this.dateRangeValue[1]?.toISOString();
    console.log(this.projectData);

    this.projectTaskService
      .editProject(this.projectData, this.id)
      .subscribe((data) => {
        console.log('uspjesno editovan projekt!');
        console.log(data);
        this.router.navigateByUrl('');
      });
  }
}
