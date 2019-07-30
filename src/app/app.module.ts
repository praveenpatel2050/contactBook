import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { SignupComponent } from './signup/signup.component';
import { CreatecontactComponent } from './createcontact/createcontact.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { UpdatecontactComponent } from './updatecontact/updatecontact.component';

import { AuthGuard } from './auth/auth.guard';

import { AuthService } from './auth/auth.service';
import {StorageServiceModule} from 'angular-webstorage-service';
import {UserService} from './user.service';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactlistComponent,
    SignupComponent,
    CreatecontactComponent,
    ProfileComponent,
    HomeComponent,
    UpdateprofileComponent,
    ChangepwdComponent,
    UpdatecontactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NotifierModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(),
    StorageServiceModule,
    ScrollDispatchModule    
  ],
  providers: [AuthGuard,AuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
