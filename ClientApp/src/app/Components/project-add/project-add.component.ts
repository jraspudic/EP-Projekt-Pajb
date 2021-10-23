import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { ProjectTaskPost } from 'src/app/Models/ProjectTaskPost.model';
import { User } from 'src/app/Models/User.model';
import { ProjectTaskService } from 'src/app/Services/project-task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
  providers: [CheckBoxSelectionService, DateRangePickerModule],
})
export class ProjectAddComponent implements OnInit {
  constructor(
    private userService: UserService,
    private projectTaskService: ProjectTaskService,
    public router: Router
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
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      console.log('Users data stigo:');
      console.log(data);
      this.users = data.users;
      this.formatUsers();
    });
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
      .createProject(this.projectData)
      .subscribe((data) => {
        console.log('uspjesno spasen projekt!');
        console.log(data);
        this.router.navigateByUrl('');
      });
  }
}
