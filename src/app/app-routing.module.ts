import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
					{
						path : '',
						component : HomeComponent,
						canActivate: [AuthGuard]
					},
					{
						path :'signup',
						component : SignupComponent 
					},
					{
						path :'login',
						component : LoginComponent
					},
					{
						path : 'addcontact',
						component : CreatecontactComponent,	
						canActivate: [AuthGuard]

					},
					{
						path :'contactlist',
						component : ContactlistComponent,
						canActivate: [AuthGuard]

					},
					{
						path : 'profile',
						component : ProfileComponent,
						canActivate: [AuthGuard]

					},
					{
						path :'changepwd',
						component : ChangepwdComponent,
						canActivate: [AuthGuard]

					},
					{
						path : 'updateprofile',
						component : UpdateprofileComponent,
						canActivate: [AuthGuard]

					},
					{
						path : 'editcontact',
						component : UpdatecontactComponent,
						canActivate: [AuthGuard]

					}
					// { path: '**', redirectTo: '' }
				];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
