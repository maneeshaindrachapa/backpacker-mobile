import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule)},
  { path: 'forgetpassword', loadChildren: () => import('./forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordModule)}

  // {
  //   path: 'location',
  //   loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  // }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
