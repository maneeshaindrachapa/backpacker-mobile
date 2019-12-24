import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // tslint:disable-next-line:variable-name
  netConnAlert;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private menu: MenuController,
    private router: Router,
    public alertController: AlertController,
    private openNativeSettings: OpenNativeSettings,
    private network: Network
  ) {
    this.initializeApp();
    this.connEventSubscription();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openHome_menu() {
    this.menu.enable(true, 'home_menu');
    this.menu.open('home_menu');
  }

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
      if(this.netConnAlert) {
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
