import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { ProjectTaskPost } from 'src/app/Models/ProjectTaskPost.model';
import { User } from 'src/app/Models/User.model';
import { ProjectTaskService } from 'src/app/Services/project-task.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
  providers: [CheckBoxSelectionService],
})
export class TaskAddComponent implements OnInit {
  constructor(
    private userService: UserService,
    public projectTaskService: ProjectTaskService,
    public router: Router
  ) {}

  users: User[] = [];

  taskData: ProjectTaskPost = new ProjectTaskPost(
    null,
    null,
    null,
    null,
    null,
    '0'
  );

  dateRangeValue: any;
  ngOnInit(): void {
    if (!this.projectTaskService.parentProject) {
      this.router.navigateByUrl('');
    }
    this.taskData.parentId = this.projectTaskService.parentProject?._id;
    console.log('useri');
    console.log(this.projectTaskService.parentProject.users);
    this.users = this.projectTaskService.parentProject.users;
    this.formatUsers();
  }

  formatUsers() {
    this.users.forEach((user) => {
      user.fullName = user.firstName + ' ' + user.lastName;
    });
  }

  onSave() {
    this.taskData.startDate = this.dateRangeValue[0]?.toISOString();
    this.taskData.endDate = this.dateRangeValue[1]?.toISOString();
    console.log(this.taskData);

    this.projectTaskService.createProject(this.taskData).subscribe((data) => {
      console.log('uspjesno spasen task!');
      console.log(data);
      this.router.navigateByUrl('');
    });
  }
}
