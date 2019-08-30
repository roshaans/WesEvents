import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard,TutorialGuard] },
  { path: 'card/:id', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' , canActivate: [AuthGuard] },
  { path: 'editEvent/:id', loadChildren: './maintabs/editEvent/editEvent.module#EditEventPageModule' , canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './accountManager/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './accountManager/forgot/forgot.module#ForgotPageModule' },
  { path: 'signup', loadChildren: './accountManager/signup/signup.module#SignupPageModule' },
  { path: 'settings', loadChildren: './accountManager/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'homepage', loadChildren: './accountManager/homepage/homepage.module#HomepagePageModule' },
  { path: 'show-going/:id', loadChildren: './show-going/show-going.module#ShowGoingPageModule' },
  { path: 'create-event', loadChildren: './maintabs/create-event/create-event.module#CreateEventPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'userprofile/:uuid', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'onboarding', loadChildren: './onboarding/onboarding.module#OnboardingPageModule' },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
