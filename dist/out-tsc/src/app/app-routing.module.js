import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
    { path: 'home', redirectTo: '', pathMatch: "full" },
    { path: 'card/:id', loadChildren: './card-detail/card-detail.module#CardDetailPageModule', canActivate: [AuthGuard] },
    { path: 'editEvent/:id', loadChildren: './maintabs/editEvent/editEvent.module#EditEventPageModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './accountManager/login/login.module#LoginPageModule' },
    { path: 'forgot', loadChildren: './accountManager/forgot/forgot.module#ForgotPageModule' },
    { path: 'signup', loadChildren: './accountManager/signup/signup.module#SignupPageModule' },
    { path: 'settings', loadChildren: './accountManager/home/home.module#HomePageModule', canActivate: [AuthGuard] },
    { path: 'homepage', loadChildren: './accountManager/homepage/homepage.module#HomepagePageModule' },
    { path: 'show-going/:id', loadChildren: './show-going/show-going.module#ShowGoingPageModule' },
    { path: 'create-event', loadChildren: './maintabs/create-event/create-event.module#CreateEventPageModule' },
    { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
    { path: 'userprofile/:uuid', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map