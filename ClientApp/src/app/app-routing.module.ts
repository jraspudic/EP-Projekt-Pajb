import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ProjectAddComponent } from './Components/project-add/project-add.component';
import { ProjectEditComponent } from './Components/project-edit/project-edit.component';
import { TaskAddComponent } from './Components/task-add/task-add.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { UserAddComponent } from './Components/user-add/user-add.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { UsersComponent } from './Components/users/users.component';
import { AuthGuard } from './Helpers/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addProject',
    component: ProjectAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProject/:id',
    component: ProjectEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createUser',
    component: UserAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editUser/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createTask',
    component: TaskAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editTask/:id',
    component: TaskEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
