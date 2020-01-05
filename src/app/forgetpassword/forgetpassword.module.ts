import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword.component';

import 'gl-ionic-background-video';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForgetpasswordComponent
      }
    ])
  ],
  declarations: [ForgetpasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgetpasswordModule { }
