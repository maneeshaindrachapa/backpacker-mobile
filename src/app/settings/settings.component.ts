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
  constructor(private userService: UserService,
              private router: Router,
              public alertController: AlertController,
             ) { }

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

  userProfile() {
    this.router.navigate(['tabs', 'settings', 'user-profile'], { queryParams: {uid: this.userService.loggedUser.authData.uid, backRoute: 'tabs/settings'}});
  }
}
