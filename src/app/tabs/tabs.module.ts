import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
        { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
        { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule) },
    ]
  },
  { path: '', redirectTo: 'home/home', pathMatch: 'full' },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsComponent]
})

export class TabsModule { }
