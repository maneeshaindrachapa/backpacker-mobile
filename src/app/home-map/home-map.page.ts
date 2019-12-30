import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions
 } from '@ionic-native/google-maps';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Platform } from '@ionic/angular';

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
                lat: 6.0559758,
                lng: 80.1769773
            },
        zoom: 15,
    },
    center: {
        lat: 6.0559758,
        lng: 80.1769773
    },
    mapType: 'terrain',
    zoomControl: false

};
  constructor(private router: Router, private userService: UserService, private platform: Platform) {}

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
}
