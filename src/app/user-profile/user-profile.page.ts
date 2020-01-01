import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userData;
  isLoading = false;
  backRoute;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    route.queryParams.subscribe((data: any) => {
      this.loadUserData(data.uid);
      this.backRoute = data.backRoute;
    });
  }

  ngOnInit() {
  }

  loadUserData(id) {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe((data: any) => {
      this.userData = data;
      this.isLoading = false;
      console.log(data);
    });
  }
}
