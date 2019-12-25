import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  latitude: number;
  longitude: number;
  altitude: number;
  light: number;
  microphone: number;

  constructor(private geolocation: Geolocation, private sensors: Sensors, private dbMeter: DBMeter) {
    this.light = 0;
  }

  getCurrentPositionData() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
      this.altitude = data.coords.altitude;
    });
  }

  getLightSensorData(time: any) {
    let timeInterval = time / 10;
    let lightPerPeriod = 0
    this.sensors.disableSensor();

    // this.sensors.enableSensor("LIGHT");
    this.sensors.enableSensor(TYPE_SENSOR.LIGHT);

    // repeat with the interval of period seconds
    let lightPerPeriodCalc = setInterval(() => {
      this.sensors.getState().then((values) => {
        lightPerPeriod += values[0]
      });
    }, timeInterval)

    // after given seconds stop
    setTimeout(() => { clearInterval(lightPerPeriodCalc); this.light = lightPerPeriod/10;}, time);
  }

  getMicrophoneData(time: any) {
    let timeInterval = time / 10;
    let dbPerPeriod = 0;

    // repeat with the interval of period seconds
    let dbPerPeriodCalc = setInterval(() => {
      // Start listening
      let subscription = this.dbMeter.start().subscribe(
        data => {
          dbPerPeriod += data;
          console.log(dbPerPeriod);
        }
      );
    }, timeInterval);

    // after given seconds stop
    setTimeout(() => { clearInterval(dbPerPeriodCalc); this.microphone = (dbPerPeriod/10); }, time);
  }

}
