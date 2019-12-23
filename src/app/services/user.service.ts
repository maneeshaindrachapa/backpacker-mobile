import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Md5} from 'ts-md5/dist/md5';
import {AngularFireAuth} from '@angular/fire/auth';
import {error} from 'util';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {
   this.registerUser({name: 'Thilina Prasad', email: 'thilina.prashad25@gmail.com', age: 24, address: '17B, Kadewaththa, Imbulagoda, Rathgama.', password: '1236'}).then((data) => {
     console.log(data);
   });
  }

  // // login authentication
  // authenticateUser(email: string, password: string) {
  //   return new Promise( resolve => {
  //     this.getUserByEmail(email).subscribe((data: any) => {
  //       if (data.length === 1) {
  //         const user = data[0];
  //         if (user.password === Md5.hashStr(password)) {
  //           resolve(true);
  //         } else {
  //           resolve(false);
  //         }
  //       }
  //     });
  //   });
  // }
  //
  // // register user
  // registerUser(user: any) {
  //   user.password = Md5.hashStr(user.password);
  //   return new Promise( resolve => {
  //         this.addUser(user).then(() => {
  //           resolve(true);
  //         });
  //   });
  // }

  authenticateUser(email: string, password: string) {
    return new Promise( resolve => {
     this.fireauth.auth.signInWithEmailAndPassword(email, password);
    });
  }

  registerUser(user: any) {
    return new Promise( resolve => {
      this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then((authuser: any) => {
        const userSubData = {
          address: user.address,
          age: user.age,
          displayName: user.name
        };
        this.addUser(authuser.user.uid, userSubData).then(() => {
          resolve({status: true, description: 'User added successfully!'});
        });
      }).catch((data: any) => {
        resolve({status: false, description: data.message});
      });
    });
  }

  getUserByEmail(email) {
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  addUser(uid, user) {
    return this.firestore.collection('users').doc(uid).set(user);
  }

}
