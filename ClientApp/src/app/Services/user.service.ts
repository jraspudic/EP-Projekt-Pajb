import { Injectable } from '@angular/core';
import { UserAuthenticatePost } from '../Models/UserAuthenticatePost.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models/User.model';
import { UserPost } from '../Models/UserPost.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public editedUser: User = null;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: UserAuthenticatePost) {
    return this.http.post<any>('http://localhost:3000/users/login', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.clear();
  }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/users');
  }

  createUser(user: UserPost) {
    return this.http.post<any>('http://localhost:3000/users/register', user);
  }

  editUser(user: UserPost, id: string) {
    return this.http.put<any>(`http://localhost:3000/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`http://localhost:3000/users/${id}`);
  }
}
