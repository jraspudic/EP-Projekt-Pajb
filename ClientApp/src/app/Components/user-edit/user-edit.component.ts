import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPost } from 'src/app/Models/UserPost.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  public userData: UserPost = new UserPost(null, null, null);
  routeSub: Subscription;
  public id: string;
  ngOnInit(): void {
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
    this.userData.firstName = this.userService.editedUser.firstName;
    this.userData.lastName = this.userService.editedUser.lastName;
    this.userData.email = this.userService.editedUser.email;
  }

  onSave() {
    console.log(this.userData);
    this.userService.editUser(this.userData, this.id).subscribe(
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
