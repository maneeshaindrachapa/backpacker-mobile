import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, public toastController: ToastController) { }

  email;

  ngOnInit() {}

  sendEmail() {
    if (this.email) {
      this.userService.sendPasswordReset(this.email).then((data) => {
        this.presentToast('Password reset link sent to ' + this.email + ' successfully!', 2000).then(() => {
          this.login();
        });
      }).catch((err: any) => {
        this.presentToast(err.message, 1000);
      });
    } else {
      this.presentToast('Please enter email to send password reset link!', 1500);
    }
  }
  login() {
    this.router.navigate(['./login']);
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
