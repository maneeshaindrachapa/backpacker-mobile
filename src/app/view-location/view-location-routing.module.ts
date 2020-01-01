import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLocationPage } from './view-location.page';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: ViewLocationPage
    },
      {
      path: 'user-profile',
      loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLocationPageRoutingModule {}
