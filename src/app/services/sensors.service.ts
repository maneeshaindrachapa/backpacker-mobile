import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Sensors, TYPE_SENSOR} from '@ionic-native/sensors/ngx';
import {DBMeter} from '@ionic-native/db-meter/ngx';
import {Platform} from '@ionic/angular';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {promise} from 'selenium-webdriver';

@Injectable({
    providedIn: 'root'
})
export class SensorsService {

    // light: number;

    constructor(private geolocation: Geolocation,
                private sensors: Sensors,
                private dbMeter: DBMeter,
                private platform: Platform,
                private nativeGeoCoder: NativeGeocoder) {
        // this.light = 0;
        platform.ready().then(() => {
            this.sensors.enableSensor('LIGHT');
            this.sensors.enableSensor('TEMPERATURE');
            this.sensors.enableSensor('PRESSURE');
        });
    }

    getCurrentPositionData() {
        return this.geolocation.watchPosition();
    }

    getGeoCoder(latitude, longitude) {
        const geoCoderOptions: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        return this.nativeGeoCoder.reverseGeocode(latitude, longitude, geoCoderOptions);
    }

    generateAddress(addressObj) {
        const obj = [];
        let address = '';
        // tslint:disable-next-line:forin
        for (const key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                address += obj[val] + ', ';
            }
        }
        return address.slice(0, -2);
    }

    getLightSensorData(time: any) {
        let lightPerPeriod = 0;

        this.sensors.enableSensor(TYPE_SENSOR.LIGHT);
        return new Promise(resolve => {
            // repeat with the interval of period seconds
            const lightPerPeriodCalc = setInterval(() => {
                this.sensors.getState().then((values) => {
                    // console.log(values);
                    lightPerPeriod += values[0];
                });
            }, 1000);

            // after given seconds stop
            setTimeout(() => {

                clearInterval(lightPerPeriodCalc);
                // this.light = lightPerPeriod / time;
                resolve(this.luxFormatter(lightPerPeriod / time));
            }, time * 1000);
        });
    }

    getTemperatureSensorData(time: any) {
        let temperaturePerPeriod = 0;

        this.sensors.enableSensor(TYPE_SENSOR.TEMPERATURE);
        return new Promise(resolve => {
            // repeat with the interval of period seconds
            const temperaturePerPeriodCalc = setInterval(() => {
                this.sensors.getState().then((values) => {
                    // console.log(values);
                    temperaturePerPeriod += values[0];
                });
            }, 1000);

            // after given seconds stop
            setTimeout(() => {

                clearInterval(temperaturePerPeriodCalc);
                // this.light = lightPerPeriod / time;
                resolve(temperaturePerPeriod / time);
            }, time * 1000);
        });
    }

    getPressureSensorData(time: any) {
        let pressurePerPeriod = 0;

        this.sensors.enableSensor(TYPE_SENSOR.PRESSURE);
        return new Promise(resolve => {
            // repeat with the interval of period seconds
            const pressurePerPeriodCalc = setInterval(() => {
                this.sensors.getState().then((values) => {
                    // console.log(values);
                    pressurePerPeriod += values[0];
                });
            }, 1000);

            // after given seconds stop
            setTimeout(() => {

                clearInterval(pressurePerPeriodCalc);
                // this.light = lightPerPeriod / time;
                resolve(pressurePerPeriod / time);
            }, time * 1000);
        });
    }

    luxFormatter(luxVal) {
        const outputJson = {displayData: '', actualValue: luxVal};

        if (luxVal <= 0.0001) {
            outputJson.displayData = 'Overcast Night';
        } else if (luxVal <= 0.0011) {
            outputJson.displayData = 'Starlight';
        } else if (luxVal <= 0.0108) {
            outputJson.displayData = 'Quarter Moon';
        } else if (luxVal <= 0.108) {
            outputJson.displayData = 'Full Moon';
        } else if (luxVal <= 1.08) {
            outputJson.displayData = 'Deep Twilight';
        } else if (luxVal <= 10.8) {
            outputJson.displayData = 'Twilight';
        } else if (luxVal <= 107) {
            outputJson.displayData = 'Very Dark Day';
        } else if (luxVal <= 1075) {
            outputJson.displayData = 'Overcast Day';
        } else if (luxVal <= 10752) {
            outputJson.displayData = 'Full Daylight';
        } else if (luxVal <= 107527) {
            outputJson.displayData = 'Sunlight';
        }
        outputJson.displayData += ' (' + luxVal.toString() + 'lx)';
        return outputJson;
    }


    getMicrophoneData(interval: any) {
        let sensorReadingSum = 0;
        let sensingRounds = 0;

        // Subscribe sensor reading event
        const subscription = this.dbMeter.start().subscribe(
            data => {
                sensorReadingSum += data;
                sensingRounds += 1;
            });

        // wait given time period and stop sensing
        return new Promise(resolve => {
            setTimeout(() => {
                subscription.unsubscribe();
                const avgSensorReading = sensorReadingSum / sensingRounds;
                resolve(this.noiseFormatter((avgSensorReading)));
            }, interval * 1000);
        });
    }

    noiseFormatter(dbVal) {
        const outputJson = {displayData: '', actualValue: 0};
        const db = this.roundFloat(dbVal, 1);

        if (dbVal > 30 && dbVal <= 40) {
            outputJson.displayData = 'Leaves rustling, soft music, whisper';
        } else if (dbVal > 40 && dbVal <= 50) {
            outputJson.displayData = 'Average home noise';
        } else if (dbVal > 50 && dbVal <= 70) {
            outputJson.displayData = 'Normal conversation, background music';
        } else if (dbVal > 70 && dbVal <= 75) {
            outputJson.displayData = 'Office noise, inside car at 60 mph';
        } else if (dbVal > 75 && dbVal <= 80) {
            outputJson.displayData = 'Vacuum cleaner, average radio';
        } else if (dbVal > 80 && dbVal <= 90) {
            outputJson.displayData = 'Heavy traffic, window air conditioner, noisy restaurant, power lawn mower';
        } else if (dbVal > 90 && dbVal <= 95) {
            outputJson.displayData = 'Subway, shouted conversation';
        } else if (dbVal > 95 && dbVal <= 100) {
            outputJson.displayData = 'Boom box, ATV, motorcycle';
        } else if (dbVal > 100 && dbVal <= 105) {
            outputJson.displayData = 'School dance';
        } else if (dbVal > 105 && dbVal <= 115) {
            outputJson.displayData = 'Chainsaw, leaf blower, snowmobile';
        } else if (dbVal > 115 && dbVal <= 125) {
            outputJson.displayData = 'Sports crowd, rock concert, loud symphony';
        } else if (dbVal > 125 && dbVal <= 135) {
            outputJson.displayData = 'Stock car races';
        } else if (dbVal > 135 && dbVal <= 145) {
            outputJson.displayData = 'Gun shot, siren at 100 feet';
        }
        outputJson.displayData += ' (' + db.toString() + 'dB)';
        return outputJson;
    }

    roundFloat(value, precision) {
        // tslint:disable-next-line:prefer-const
        let multiplier = Math.pow(10, precision || 0);
        // tslint:disable-next-line:prefer-const
        let dbVal = Math.round(value * multiplier) / multiplier;
        return dbVal;
    }
}
