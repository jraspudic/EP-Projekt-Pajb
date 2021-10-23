import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  searchBoxValue: string;

  public users: User[];
  //  = [
  //   new User('1', 'petra.kresic@gmail.com', 'Petra', 'Krešić'),
  //   new User('2', 'ana.seser@gmail.com', 'Ana', 'Seser'),
  //   new User('3', 'jurica.raspudic@gmail.com', 'Jurica', 'Raspudić'),
  //   new User('4', 'boris.dugandzic@gmail.com', 'Boris', 'Dugandžić'),
  // ];
  currentUser = this.userService.currentUserValue;
  ngOnInit(): void {
    console.log('current user je;');
    console.log(this.userService.currentUserValue);

    this.userService.getUsers().subscribe((data) => {
      console.log('Users data stigo:');
      console.log(data);
      this.users = data.users;
    });
  }

  addUser() {
    this.router.navigateByUrl('createUser');
  }

  editUser(user) {
    this.userService.editedUser = user;
    this.router.navigateByUrl('editUser/' + user._id);
  }

  deleteUser(id: string) {
    console.log('delete user');
    this.userService.deleteUser(id).subscribe(
      (data) => {
        this.userService.getUsers().subscribe((data) => {
          console.log('Users data stigo:');
          console.log(data);
          this.users = data.users;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
