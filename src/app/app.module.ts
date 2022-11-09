import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/pages/login/login.component';
import { ReservationComponent } from './reservation/pages/reservation/reservation.component';
import { ServiceRequestComponent } from './service-request/pages/service-request/service-request.component';
import { SignupComponent } from './signup/pages/signup/signup.component';
import { SettingsComponent } from './settings/pages/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app.routing";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import  {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from "@angular/material/chips";
import { ChangePasswordComponent } from './dialogs/change-password/pages/change-password/change-password.component';
import { ConfirmComponent } from './service-request/dialogs/confirm/confirm.component';
import { CancelComponent } from './service-request/dialogs/cancel/cancel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservationComponent,
    ServiceRequestComponent,
    SignupComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ConfirmComponent,
    CancelComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatDialogModule,
        MatDividerModule,
        MatDatepickerModule,
        MatSnackBarModule,
        MatChipsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
