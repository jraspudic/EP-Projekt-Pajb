import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectTaskPost } from '../Models/ProjectTaskPost.model';
import { TasksDisplay } from '../Models/TasksDisplay.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService {
  constructor(private http: HttpClient) {}

  public editedProject: TasksDisplay;
  public parentProject: TasksDisplay;
  public editedTask: TasksDisplay;

  createProject(project: ProjectTaskPost) {
    return this.http.post<any>('http://localhost:3000/tasks/', project);
  }

  editProject(project: ProjectTaskPost, id: string) {
    return this.http.put<any>(`http://localhost:3000/tasks/${id}`, project);
  }

  getAll() {
    return this.http.get<any>('http://localhost:3000/tasks');
  }
}
