import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSearchBarOpened = false;
  inCardView = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  toggleview() {
    this.router.navigate(['tabs', 'home', 'home-map']);
  }

}
