import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import 'gl-ionic-background-video';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent
      }
    ])
  ],
  declarations: [RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule { }
