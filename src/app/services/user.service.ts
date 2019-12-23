import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
   // tslint:disable-next-line:max-line-length
   // this.registerUser({firstName: 'Thilina', lastName: 'Prasad', email: 'tiina.prashad25@gmail.com', age: 24, address: '17B, Kadewaththa, Imbulagoda, Rathgama.', password: 'test'}).then((data) => {
   // });
  }

  // login authentication
  authenticateUser(email: string, password: string) {
    return new Promise( resolve => {
      this.getUserByEmail(email).subscribe((data: any) => {
        if (data.length === 1) {
          const user = data[0];
          if (user.password === Md5.hashStr(password)) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  // register user
  registerUser(user: any) {
    user.password = Md5.hashStr(user.password);
    return new Promise( resolve => {
          this.addUser(user).then(() => {
            resolve(true);
          });
    });
  }

  getUserByEmail(email) {
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  addUser(user) {
    return this.firestore.collection('users').add(user);
  }

}
