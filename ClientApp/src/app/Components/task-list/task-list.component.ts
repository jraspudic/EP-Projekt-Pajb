import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectTask } from 'src/app/Models/ProjectTask.model';
import { TasksDisplay } from 'src/app/Models/TasksDisplay.model';
import { ProjectTaskService } from 'src/app/Services/project-task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private router: Router,
    private projectTaskService: ProjectTaskService
  ) {}

  searchBoxValue: string;

  tasks: ProjectTask[] = [];

  tasksDisplay: TasksDisplay[] = [];
  ngOnInit(): void {
    this.projectTaskService.getAll().subscribe((data) => {
      console.log('Task data');
      console.log(data);
      this.tasks = data;
      this.formatTasks();
    });
  }

  formatTasks() {
    this.tasks.forEach((item) => {
      if (item.startDate) {
        item.startDate = new Date(item.startDate);
      }
      if (item.endDate) {
        item.endDate = new Date(item.endDate);
      }
    });

    this.tasksDisplay = [];
    this.tasks.forEach((task) => {
      if (task.parentId == '0') {
        this.tasksDisplay.push(
          new TasksDisplay(
            task._id,
            task.name,
            task.users,
            task.startDate,
            task.endDate,
            task.note,
            task.parentId,
            task.projectAdmin,
            []
          )
        );
      }
    });
    this.tasks.forEach((task) => {
      if (task.parentId != '0') {
        let index = this.tasksDisplay.findIndex(
          (item) => item._id == task.parentId
        );
        if (index > -1) {
          this.tasksDisplay[index].tasks.push(task);
        }
      }
    });
    console.log('formated task data:');
    console.log(this.tasksDisplay);
  }
  addProject() {
    console.log('add project');
    this.router.navigateByUrl('/addProject');
  }

  editProject(project) {
    this.projectTaskService.editedProject = project;

    this.router.navigateByUrl('editProject/' + project._id);
  }

  newTask(project) {
    this.projectTaskService.parentProject = project;
    this.router.navigateByUrl('createTask');
  }

  editTask(task: TasksDisplay) {
    this.projectTaskService.editedTask = task;
    let index = this.tasksDisplay.findIndex(
      (item) => item._id == task.parentId
    );
    if (index > -1) {
      this.projectTaskService.parentProject = this.tasksDisplay[index];
    }
    this.router.navigateByUrl('editTask/' + task._id);
  }

  deleteTask(task) {}
}
