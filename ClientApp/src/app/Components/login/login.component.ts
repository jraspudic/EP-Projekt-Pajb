import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthenticatePost } from 'src/app/Models/UserAuthenticatePost.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  public userLoginData: UserAuthenticatePost = new UserAuthenticatePost(
    null,
    null
  );
  ngOnInit() {}

  onSubmit() {
    console.log(this.userLoginData);
    this.userService.login(this.userLoginData).subscribe(
      (data) => {
        console.log('data');
        console.log(data);
        data.user.token = data.token;
        localStorage.clear();
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.userService.currentUserSubject.next(data.user);
        this.router.navigateByUrl("''");
      },
      (err) => {
        console.log('err');
        console.log(err);
      }
    );
  }
}
