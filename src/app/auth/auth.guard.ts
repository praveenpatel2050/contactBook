import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
// import { Operator,map } from 'rxjs';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private user:UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise <boolean>|boolean {
    let url: string = state.url;
    var session = JSON.parse(sessionStorage.getItem('current_user'));
    // let session_id = session.id;
    console.log(session); 
    if(this.authService.isLoggedIn){
      return true
    }
    if(session != null){
      console.log("here");
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
    //   return this.user.isLoggedIn().pipe(map(res => {
    //   if(res.status){
    //     this.authService.setLoggedIn(true);
    //     return true;
    //   }else{
    //     this.router.navigate(['login']);
    //   }
    // }))
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}