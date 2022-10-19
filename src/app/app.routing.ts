import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ReservationComponent} from "./reservation/pages/reservation/reservation.component";
import {LoginComponent} from "./login/pages/login/login.component";
import {AuthGuard} from "./share/guard/auth.guard";
import {LoginGuard} from "./share/guard/login.guard";
import {ServiceRequestComponent} from "./service-request/pages/service-request/service-request.component";
import {SignupComponent} from "./signup/pages/signup/signup.component";
import {SettingsComponent} from "./settings/pages/settings/settings.component";

const routes: Routes = [
  { path: 'service-request', component: ServiceRequestComponent, canActivate: [AuthGuard]},
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'log-in', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'sing-up', component: SignupComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: '/service-request', pathMatch: 'full'},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
