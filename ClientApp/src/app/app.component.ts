import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Models/User.model';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pajb-app';
  constructor(private userService: UserService, private router: Router) {}

  currentUser: User = this.userService.currentUserValue;

  ngOnInit() {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
  logout() {
    console.log('brisemo local storage!');
    localStorage.clear();
    location.reload();
    // this.router
    //   .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
    //   .then(() => {
    //     this.router.navigateByUrl('login');
    //   });
  }
}
