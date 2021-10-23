import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPost } from 'src/app/Models/UserPost.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  constructor(private userService: UserService, public router: Router) {}

  public userData: UserPost = new UserPost(null, null, null);
  ngOnInit(): void {}

  invalidEmail: boolean = false;

  confirmPassword: string = '';
  passwordsDontMatch: boolean = false;
  checkEmail() {
    console.log('Check email');
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)
    ) {
      console.log('invalid email');
      this.invalidEmail = true;
    } else {
      this.invalidEmail = false;
    }
  }

  checkPasswords() {
    console.log('check passwords');
    if (
      this.userData.password?.length < 1 ||
      this.confirmPassword?.length < 1
    ) {
      this.passwordsDontMatch = false;
      return;
    }

    if (this.userData.password != this.confirmPassword) {
      this.passwordsDontMatch = true;
    } else {
      this.passwordsDontMatch = false;
    }
  }

  onSave() {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email)
    ) {
      console.log('invalid email');
      return;
    }

    this.userService.createUser(this.userData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('users');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
