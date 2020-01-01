import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLocationPage } from './view-location.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLocationPageRoutingModule {}
