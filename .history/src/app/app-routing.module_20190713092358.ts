import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'home', redirectTo: '', pathMatch: "full"},
  { path: 'card/:id', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' , canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './accountManager/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './accountManager/forgot/forgot.module#ForgotPageModule' },
  { path: 'signup', loadChildren: './accountManager/signup/signup.module#SignupPageModule' },
  { path: 'settings', loadChildren: './accountManager/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'homepage', loadChildren: './accountManager/homepage/homepage.module#HomepagePageModule' },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
