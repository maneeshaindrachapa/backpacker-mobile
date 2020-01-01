
import { Component, OnInit } from '@angular/core';
import {  Platform } from '@ionic/angular';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
    LatLng
 } from '@ionic-native/google-maps';
import {SensorsService} from '../services/sensors.service';
import {Router} from '@angular/router';
import { mapStyle } from './mapstyles';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})

export class LocationPage implements OnInit {

  map: GoogleMap;
  marker: Marker;
  positionData = {position: {lat: 6.0559758, lng: 80.1769773}, altitude: 0, address: 'Galle, Sri Lanka.'};
  addressData = 'sample address';
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
        zoomControl: false,
        styles: mapStyle

    };
    markerOptions: MarkerOptions = {
        title: 'My Location',
        icon: 'red',
        animation: 'DROP',
        position: {
            lat: 6.0559758,
            lng: 80.1769773
        }
    };
    loading = true;
  constructor(private platform: Platform,
              private sensorService: SensorsService,
              private router: Router) {  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap(this.mapOptions);
    await this.addMarker(this.markerOptions);
    this.sensorService.getCurrentPositionData().subscribe((data: any) => {
          this.positionData.position.lat = data.coords.latitude;
          this.positionData.position.lng = data.coords.longitude;
          this.positionData.altitude =  data.coords.altitude;

          const latLng = new LatLng( data.coords.latitude,  data.coords.longitude);
          this.mapOptions.camera.target = this.positionData.position;
          this.mapOptions.center = this.positionData.position;
          this.markerOptions.position = this.positionData.position;
          this.map.setCameraTarget(latLng);
          this.marker.setPosition(latLng);
          this.sensorService.getGeoCoder(data.coords.latitude, data.coords.longitude).then((result: NativeGeocoderResult[]) => {
              this.addressData = result[0].subThoroughfare;
              this.positionData.address = result[0].subThoroughfare;
              this.loading = false;
          });
      });
}

loadMap(mapOptions) {
  this.map = GoogleMaps.create('map_canvas', mapOptions);
}

addMarker(markerOptions) {
    this.marker = this.map.addMarkerSync(markerOptions);
}

setLocation() {
      this.router.navigate(['tabs', 'location', 'add'], { queryParams: { locationData: JSON.stringify(this.positionData)} });
}
}

