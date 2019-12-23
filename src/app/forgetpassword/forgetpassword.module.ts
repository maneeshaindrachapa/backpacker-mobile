import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword.component';


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
  declarations: [ForgetpasswordComponent]
})
export class ForgetpasswordModule { }
