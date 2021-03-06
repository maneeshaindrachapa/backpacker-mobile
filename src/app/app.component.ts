import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';
import {ReadingsPage} from './add/readings/readings.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // tslint:disable-next-line:variable-name
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
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.connEventSubscription();
    });
  }

  login(param) {
    this.router.navigate(['./login'], { queryParams: { email: param } });
  }

  async connEventSubscription() {
    const alert = await this.alertController.create({
      header: 'No Internet Connection',
      // tslint:disable-next-line:max-line-length
      message: '<div class="w-100 text-center"><i class="fas fa-exclamation-triangle fa-4x" ></i><br><br>Sorry! Not detected any Internet connection. Please reconnect and try again.</div>',
      backdropDismiss: false,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Open Settings',
          handler: () => {
            this.openNativeSettings.open('settings').then(() => {
            });
          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    this.network.onConnect().subscribe(() => {
        alert.dismiss();
    });
    this.network.onDisconnect().subscribe(() => {
        alert.present();
    });
  }

}
