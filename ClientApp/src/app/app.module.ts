import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './Components/users/users.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Helpers/jwt.interceptor';
import { ProjectAddComponent } from './Components/project-add/project-add.component';
import {
  DropDownListModule,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ProjectEditComponent } from './Components/project-edit/project-edit.component';
import { UserAddComponent } from './Components/user-add/user-add.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { TaskAddComponent } from './Components/task-add/task-add.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';
import { ToDoListComponent } from './Components/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    UsersComponent,
    LoginComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    UserAddComponent,
    UserEditComponent,
    TaskAddComponent,
    TaskEditComponent,
    ToDoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DropDownListModule,
    MultiSelectModule,
    DateRangePickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
