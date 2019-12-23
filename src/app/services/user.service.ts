import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Md5} from 'ts-md5/dist/md5';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {
   // fireauth.auth.signInWithEmailAndPassword('thilina.prashad25@gmail.com', '123456').then((data => {
   //     console.log(data);
   // }));
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
