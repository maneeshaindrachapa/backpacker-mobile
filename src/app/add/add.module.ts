import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import 'gl-ionic-background-video';
import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule
  ],
  declarations: [AddPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddPageModule {}
