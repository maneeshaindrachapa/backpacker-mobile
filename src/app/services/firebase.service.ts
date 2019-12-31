import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) {
  }

  saveSensorData(locationData) {
    // tslint:disable-next-line:max-line-length
    const fireStoreData = {location: locationData.location, sensorData: locationData.sensorData, timeStamp: locationData.timeStamp, userId: locationData.userId, recommendation: locationData.recommendation};
    return new Promise((resolve) => {
      this.firestore.collection('locationData').add(fireStoreData).then((firestoreResponse: any) => {
        const path = '/locationData/' + firestoreResponse.id;
        resolve(this.firestorage.ref(path).putString(locationData.picture, 'data_url').percentageChanges());
      });
    });
  }

    getAllSensorData() {
      return this.firestore.collection('locationData').snapshotChanges();
    }

  // should pass {lat: 6.8001731, lng: 79.9011715} obj as input
  getSensorDataByLaLong(latLngObj) {
        return new Promise(resolve => {
            // tslint:disable-next-line:max-line-length no-unused-expression
            this.firestore.collection('locationData', ref => (ref.where('location.position.lat', '==', latLngObj.lat), '&&', (ref.where('location.position.lng', '==', latLngObj.lng)))).snapshotChanges().subscribe((locationData: any) => {
                const tempOutput = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < locationData.length; i++) {
                    const tempDataObj = {id: null, data: null, path: null, imgUrl: null};
                    tempDataObj.data = locationData[i].payload.doc.data();
                    tempDataObj.id = locationData[i].payload.doc.id;
                    tempDataObj.path = locationData[i].payload.doc.ref.path;
                    this.firestorage.ref(tempDataObj.path).getDownloadURL().subscribe((url) => {
                        tempDataObj.imgUrl = url;
                    });
                    tempOutput.push(tempDataObj);
                }
                resolve(tempOutput);
            });
        });
    }

  getFireStorageDataByPath(path) {
      return this.firestorage.ref(path).getDownloadURL();
  }
}

