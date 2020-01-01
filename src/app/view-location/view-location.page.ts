import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.page.html',
  styleUrls: ['./view-location.page.scss'],
})
export class ViewLocationPage implements OnInit {
  backRoute;
  locationData = {id: null, data: null, path: null, imgUrl: null};
  isLoading = false;
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
    route.queryParams.subscribe((data: any) => {
      this.getLocationData(data.id);
      this.backRoute = data.backRoute;
    });
  }

  ngOnInit() {
  }

  getLocationData(id) {
    this.isLoading = true;
    this.firebaseService.getLocationByID(id).snapshotChanges().subscribe((location: any) => {
        this.locationData.id = location.payload.id;
        this.locationData.data = location.payload.data();
        this.locationData.path = location.payload.ref.path;
        this.firebaseService.getFireStorageDataByPath(location.payload.ref.path).subscribe((imgPath) => {
            this.locationData.imgUrl = imgPath;
        }, error => {
          console.log(error);
        });
        this.isLoading = false;
    });
  }
}
