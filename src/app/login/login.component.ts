import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email;
  password;
  isLoading = false;
  isErrorInPassword = false;
  isErrorInEmail = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              public toastController: ToastController) {
    route.queryParams.subscribe((data: any) => {
      if (data) {
        this.email = data.email;
      }
    });

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      this.router.navigate(['./home']);
    }
  }

  ngOnInit() {}
  register() {
    this.router.navigate(['./register']);
  }
  login() {
    this.isErrorInEmail = false;
    this.isErrorInPassword = false;
    this.isLoading = true;
    this.userService.loginUser(this.email, this.password).then((data: any) => {
      if (data.status) {
        const loggedUser = data.data;
        localStorage.setItem('loggedUser', JSON.stringify(data.data));
        this.isLoading = false;
        this.router.navigate(['./home']);
      } else {
        switch (data.data.code) {
          case 'auth/wrong-password': {
            this.isErrorInPassword = true;
            break;
          }
          case 'auth/user-not-found' : {
            this.isErrorInEmail = true;
            this.isErrorInPassword = true;
            break;
          }
        }
        this.isLoading = false;
        this.presentToast(data.data.message, 2000);
      }
    });
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
  forgetPassword() {
    this.router.navigate(['./forgetpassword']);
  }
}

