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
          { path: 'view', loadChildren: () => import('../view-details/view-details.module').then(m => m.ViewDetailsModule) }
        ]
      }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
