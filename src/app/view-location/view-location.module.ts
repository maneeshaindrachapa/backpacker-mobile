import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLocationPageRoutingModule } from './view-location-routing.module';

import { ViewLocationPage } from './view-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLocationPageRoutingModule
  ],
  declarations: [ViewLocationPage]
})
export class ViewLocationPageModule {}
