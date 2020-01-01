import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '',  component: HomeComponent },
          { path: 'home-map', loadChildren: () => import('../home-map/home-map.module').then(m => m.HomeMapPageModule) },
          { path: 'view-location', loadChildren: () => import('../view-location/view-location.module').then( m => m.ViewLocationPageModule)}
        ]
      }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
