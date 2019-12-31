import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingsPageRoutingModule } from './readings-routing.module';
import 'gl-ionic-background-video';
import { ReadingsPage } from './readings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingsPageRoutingModule
  ],
  declarations: [ReadingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReadingsPageModule {}
