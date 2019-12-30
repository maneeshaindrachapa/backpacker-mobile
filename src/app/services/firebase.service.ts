import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) {
    // console.log('firebase service');
    // // tslint:disable-next-line:max-line-length
    // const data = {location: {position: {lat: 6.8001435, lng: 79.9011946}, altitude: -77.20000457763672, address: 'New Hostel Complex, university of Moratuwa, Bandaranayeke Road, Katubadda'},
    //   picture: null,
    //   sensorData: [{displayName: 'Noise Level', sensorReading: 'Normal conversation, background music (57.9dB)', icon: 'mic'}]};
    // this.saveSensorData(data);
  }

  saveSensorData(locationData) {
    // tslint:disable-next-line:max-line-length
    const fireStoreData = {location: locationData.location, sensorData: locationData.sensorData, timeStamp: locationData.timeStamp, userId: locationData.userId};
    return new Promise((resolve) => {
      this.firestore.collection('locationData').add(fireStoreData).then((firestoreResponse: any) => {
        const path = '/location_images/' + firestoreResponse.id;
        resolve(this.firestorage.ref(path).putString(locationData.picture, 'data_url').percentageChanges());
      });
    });
  }
}
