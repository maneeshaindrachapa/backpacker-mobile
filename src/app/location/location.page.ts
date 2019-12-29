import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import {SensorsService} from '../services/sensors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit{

  map: GoogleMap;
  loading: any;
    mapOptions: GoogleMapOptions = {
        camera: {
            target: {
                lat: 6.0559758,
                lng: 80.1769773
            },
            zoom: 12,
        },
        center: {
            lat: 6.0559758,
            lng: 80.1769773
        },
        mapType: 'ROADMAP',
        zoomControl: false

    };
    markerOptions: MarkerOptions = {
        title: 'Ionic',
        icon: 'red',
        animation: 'DROP',
        position: {
            lat: 6.0559758,
            lng: 80.1769773
        }
    };

  constructor(private platform: Platform, private sensorService: SensorsService, private router: Router) {
      this.sensorService.getCurrentPositionData().then((data: any) => {
          this.mapOptions.camera.target = data.position;
          this.mapOptions.center = data.position;
          this.markerOptions.position = data.position;
      });
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    // await this.addMarker();
}

loadMap() {
  this.map = GoogleMaps.create('map_canvas', this.mapOptions);
  this.map.one(GoogleMapsEvent.MAP_READY)
  .then(() => {
    this.map.addMarker(this.markerOptions)
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {

          });
      });

  });
}

addMarker() {
  this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {

              });
          });

      });
}

setLocation() {
      this.router.navigate(['./tabs/add'], { queryParams: { locationData: {}} });
}
}

