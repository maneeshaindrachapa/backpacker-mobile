import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isSearchBarOpened = false;
  locationData = [];
  searchedLocationData = [];
  isLoading = false;
  searchKeyword;
  constructor(private router: Router,
              private userService: UserService,
              private firebaseService: FirebaseService) {
    this.loadAllSensorData();
  }

  ngOnInit() { }

  toggleview() {
    this.router.navigate(['tabs', 'home', 'home-map']);
  }

  loadAllSensorData() {
    this.isLoading = true;
    this.firebaseService.getAllSensorData().subscribe((locationData) => {
      this.locationData = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < locationData.length; i++) {
        const tempDataObj = {id: null, data: null, path: null, imgUrl: null};
        tempDataObj.data = locationData[i].payload.doc.data();
        tempDataObj.id = locationData[i].payload.doc.id;
        tempDataObj.path = locationData[i].payload.doc.ref.path;
        this.firebaseService.getFireStorageDataByPath(locationData[i].payload.doc.ref.path).subscribe((url) => {
          tempDataObj.imgUrl = url;
        }, error => {
          console.log(error);
        });
        this.locationData.push(tempDataObj);
      }
      this.searchedLocationData = this.locationData;
      this.isLoading = false;
    });
  }

  viewLocation(locationId, backRoute) {
    this.router.navigate(['tabs', 'home', 'view-location'], { queryParams: {id: locationId, backRoute}});
  }

  searchLocation() {
    if (this.searchedLocationData.length && this.searchKeyword && this.searchKeyword.trim().length) {
      this.searchedLocationData = this.searchedLocationData.filter(location => {
        return location.data.location.address.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1;
      });
    } else {
      this.searchedLocationData = this.locationData;
    }
  }
}
