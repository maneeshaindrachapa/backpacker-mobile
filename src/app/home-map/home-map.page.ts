import { Component, OnInit } from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapOptions, MarkerOptions
} from '@ionic-native/google-maps';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Platform } from '@ionic/angular';
import {mapStyle} from '../location/mapstyles';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.page.html',
  styleUrls: ['./home-map.page.scss'],
})
export class HomeMapPage implements OnInit {

  map: GoogleMap;
  isSearchBarOpened = false;
  mapOptions: GoogleMapOptions = {
    camera: {
        target: {
            lat: 7.8731,
            lng: 80.7718
            },
        zoom: 7.5,
    },
    mapType: 'terrain',
    zoomControl: false,
    scrollwheel: false,
    styles: mapStyle
  };
  isLoading = false;
  locationData;
  constructor(private router: Router,
              private userService: UserService,
              private platform: Platform,
              private firebaseService: FirebaseService) {
      this.loadAllSensorData();
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap(this.mapOptions);
  }

  view() {
    this.router.navigate(
      [
        'home',
        'home',
        'view'
      ] /*,{{ queryParams: { email: regemail, password:  regpassword} }}*/
    );
  }
  toggleview() {
    this.router.navigate(['./tabs/home']);

  }

  loadMap(mapOptions) {
    this.map = GoogleMaps.create('map_canvas_2', mapOptions);
  }

    loadAllSensorData() {
        this.isLoading = true;
        this.firebaseService.getAllSensorData().subscribe((locationData) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < locationData.length; i++) {
                const location: any = locationData[i].payload.doc.data();
                const markerOptions: MarkerOptions = {
                    title: location.location.address,
                    icon: 'red',
                    animation: 'DROP',
                    position: location.location.position
                };
                this.addMarker(markerOptions);
            }
            this.locationData = locationData;
            // tslint:disable-next-line:prefer-for-of
            this.isLoading = false;
        });
    }

    addMarker(markerOptions) {
        this.map.addMarkerSync(markerOptions);
    }
}
