import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  netConnAlert;
  constructor(private userService: UserService,
              private router: Router,
              public alertController: AlertController,
              private openNativeSettings: OpenNativeSettings,
              private network: Network) { }

  ngOnInit() {}
  login(param) {
    this.router.navigate(['./login'], { queryParams: { email: param } });
  }
  async signOut() {
    const alert = await this.alertController.create({
      header: 'Sign out',
      // tslint:disable-next-line:max-line-length
      message: '<div class="w-100 text-center"><i class="fas fa-sign-out-alt fa-4x" ></i><br><br>Do you want to sign out ?</div>',

      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Sign out',
          handler: () => {
            this.userService.logoutUser().then(data => {
              localStorage.removeItem('loggedUser');
              this.login(null);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  connEventSubscription() {
    this.network.onConnect().subscribe(() => {
      // console.log('network connected!');
      // console.log(this.netConnAlert);
      if (this.netConnAlert) {
        this.netConnAlert.dismiss();
      }
    });
    this.network.onDisconnect().subscribe(() => {
      if (!this.netConnAlert) {
        this.networkAlert();
      }
    });
  }

  async networkAlert() {
    const alert = await this.alertController.create({
      header: 'No Internet Connection',
      // tslint:disable-next-line:max-line-length
      message: '<div class="w-100 text-center"><i class="fas fa-exclamation-triangle fa-4x" ></i><br><br>Sorry! Not detected any Internet connection. Please reconnect and try again.</div>',
      backdropDismiss: false,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Open Settings',
          handler: (blah) => {
            this.openNativeSettings.open('settings').then(() => {
            });
          }
        }, {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    this.netConnAlert = await alert;
    await alert.present();
  }
}
