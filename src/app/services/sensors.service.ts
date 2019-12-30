import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import {Platform} from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  light: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  constructor(private geolocation: Geolocation, private sensors: Sensors, private dbMeter: DBMeter, private platform: Platform, private nativeGeocoder: NativeGeocoder) {
    this.light = 0;
    platform.ready().then(() => {
      this.initSensor();
    });
  }

  initSensor() {
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT).then(() => {
      setInterval(() => {
        this.sensors.getState().then((values) => {
          console.log(values);
          this.light = values[0];
        });
      }, 300);
    });
  }

  getCurrentPositionData() {
    return this.geolocation.watchPosition();
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    return this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions);
      // .then((result: NativeGeocoderResult[]) => {
      //   this.geoAddress = result[0]["subThoroughfare"];
      // })
      // .catch((error: any) => {
      //   alert('Error getGeoencoder' + JSON.stringify(error));
      // });
  }

  getLightSensorData(time: any) {
    const timeInterval = time / 10;
    let lightPerPeriod = 0
    this.sensors.disableSensor();

    // this.sensors.enableSensor("LIGHT");
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);

    // repeat with the interval of period seconds
    const lightPerPeriodCalc = setInterval(() => {
      this.sensors.getState().then((values) => {
        lightPerPeriod += values[0]
      });
    }, timeInterval)

    // after given seconds stop
    setTimeout(() => { clearInterval(lightPerPeriodCalc); this.light = lightPerPeriod/10;}, time);
  }

  getMicrophoneData(interval: any) {
    let sensorReadingSum = 0;
    let sensingRounds = 0;

    // Subscribe sensor reading event
    const subscription = this.dbMeter.start().subscribe(
          data => {
            sensorReadingSum += data;
            sensingRounds += 1;
          } );

    // wait given time period and stop sensing
    return new Promise(resolve => {
      setTimeout(() => {
        subscription.unsubscribe();
        const avgSensorReading = sensorReadingSum / sensingRounds;
        resolve(avgSensorReading);
      }, interval * 1000);
    });
  }

}
