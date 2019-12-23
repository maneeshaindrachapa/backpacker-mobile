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
    // this.registerUser({
    //   name: 'Thilina Prasad',
    //   email: 'thilina.prashad25@gmail.com',
    //   age: 24,
    //   address: '17B, Kadewaththa, Imbulagoda, Rathgama.',
    //   password: '123456'
    // }).then((data) => {
    //   console.log(data);
    // });

  }

  loginUser(email: string, password: string) {
    return new Promise( resolve => {
     this.fireauth.auth.signInWithEmailAndPassword(email, password).then((data: any) => {
       this.firestore.collection('users').doc(data.user.uid).get().subscribe((userSubData) => {
         const user: any = userSubData.data();
         user.email = data.user.email;
         resolve({status: true, data: user});
       });
     }).catch((err: any) => {
       resolve({status: false, data: err});
     });
    });
  }

  logoutUser() {
    return this.fireauth.auth.signOut();
  }

  registerUser(user: any) {
    return new Promise( resolve => {
      this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then((authuser: any) => {
        const userSubData = {
          address: user.address,
          age: user.age,
          displayName: user.name
        };
        this.addSubUserData(authuser.user.uid, userSubData).then(() => {
          resolve({status: true, data: 'User added successfully!'});
        });
      }).catch((err: any) => {
        resolve({status: false, data: err});
      });
    });
  }

  

  sendPasswordReset(email) {
    return this.fireauth.auth.sendPasswordResetEmail(email);
  }

  addSubUserData(uid, user) {
    return this.firestore.collection('users').doc(uid).set(user);
  }

}
