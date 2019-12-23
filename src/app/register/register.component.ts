import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isErrorInPassword = false;
  isErrorInEmail = false;

  isLoading = 0;

  constructor(private router: Router, private userService: UserService, public toastController: ToastController) {}

  ngOnInit() {}

  login(param) {
    this.router.navigate(['./login'], { queryParams: { email: param } });
  }

  register(form: any) {
    this.isLoading = 1;
    this.isErrorInPassword = false;
    this.isErrorInEmail = false;
    const user = form.value;
    if (user.password !== user.repassword) {
      this.isErrorInPassword = true;
      this.presentToast('Password mismatch!', 4000);
      this.isLoading = 0;
    } else {
        this.userService.registerUser(user).then((data: any) => {
          if (data.status) {
            this.isLoading = 2;
            this.presentToast('Successfully Registered!', 1000).then(() => {
              this.presentToast('Please login to the system with your credentials!', 1000).then(() => {
                this.login(user.email);
              });
            });
          } else {
            switch (data.data.code) {
              case 'auth/weak-password': {
                this.isErrorInPassword = true;
                break;
              }
              case 'auth/email-already-in-use' : {
                this.isErrorInEmail = true;
                break;
              }
            }
            this.isLoading = 0;
            this.presentToast(data.data.message, 4000);
          }
        });
    }
  }

  async presentToast(msg, dur) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      buttons: [
          {
          text: 'Close',
          role: 'cancel'
        }
      ]
    });
    toast.present();
    return toast.onDidDismiss();
  }
}
