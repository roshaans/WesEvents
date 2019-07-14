import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'home', redirectTo: '', pathMatch: "full"},
  { path: 'card/:id', loadChildren: './card-detail/card-detail.module#CardDetailPageModule'  },
  { path: 'login', loadChildren: './Account/login/login.module#LoginPageModule'  },
  { path: 'reset-password', loadChildren: './Account/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './Account/signup/signup.module#SignupPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
