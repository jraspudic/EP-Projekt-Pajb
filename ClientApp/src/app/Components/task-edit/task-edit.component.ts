import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { Subscription } from 'rxjs';
import { ProjectTaskPost } from 'src/app/Models/ProjectTaskPost.model';
import { Todo } from 'src/app/Models/Todo.model';
import { User } from 'src/app/Models/User.model';
import { ProjectTaskService } from 'src/app/Services/project-task.service';
import { UserService } from 'src/app/Services/user.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  providers: [CheckBoxSelectionService],
})
export class TaskEditComponent implements OnInit {
  constructor(
    private userService: UserService,
    public projectTaskService: ProjectTaskService,
    public router: Router,
    public route: ActivatedRoute
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

  routeSub: Subscription;
  id: string;

  todos: Todo[] = [];
  ngOnInit(): void {
    if (!this.projectTaskService.editedTask) {
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

    this.taskData.parentId = this.projectTaskService.editedTask?.parentId;
    console.log('useri');
    console.log(this.projectTaskService.parentProject.users);
    this.users = this.projectTaskService.parentProject?.users;
    this.formatUsers();

    this.taskData.name = this.projectTaskService.editedTask.name;
    this.taskData.note = this.projectTaskService.editedTask.note;
    this.taskData.users = [];
    this.projectTaskService.editedTask.users?.forEach((user) => {
      this.taskData.users.push(user._id);
    });

    this.dateRangeValue = [
      this.projectTaskService.editedTask.startDate,
      this.projectTaskService.editedTask.endDate,
    ];

    this.todos = this.projectTaskService.editedTask?.todos;
  }

  formatUsers() {
    this.users.forEach((user) => {
      user.fullName = user.firstName + ' ' + user.lastName;
    });
  }

  @ViewChild('todoComponent') todoComponent: ToDoListComponent;

  onSave() {
    console.log(this.todoComponent.todos);

    var todosPost: Todo[] = [];
    this.todoComponent.todos.forEach((todo, index) => {
      todosPost.push(
        new Todo(todo.name, index, [], todo.title, todo.checked, todo.note)
      );
    });

    this.taskData.startDate = this.dateRangeValue[0]?.toISOString();
    this.taskData.endDate = this.dateRangeValue[1]?.toISOString();
    console.log(this.taskData);

    this.taskData.todos = todosPost;

    this.projectTaskService
      .editProject(this.taskData, this.id)
      .subscribe((data) => {
        console.log('uspjesno editovan task!');
        console.log(data);
        this.router.navigateByUrl('');
      });
  }
}
