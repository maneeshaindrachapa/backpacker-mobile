import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(private router: Router, private route: ActivatedRoute) {
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.email = data.email;
      }
    });
  }

  ngOnInit() {}
  register() {
    this.router.navigate(['./register']);
  }
  login() {
    this.router.navigate(['./home']);
  }
}
