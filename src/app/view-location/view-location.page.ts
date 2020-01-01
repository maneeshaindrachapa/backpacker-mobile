import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router) {
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
        console.log(this.locationData);
    });
  }

  viewUser(id) {
      console.log('uid: ' + id);
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['tabs', 'home', 'view-location', 'user-profile'], { queryParams: {uid: id, backRoute: 'tabs/home/view-location?id=' + this.locationData.id}});
    }
}
