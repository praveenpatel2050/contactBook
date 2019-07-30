import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedInStatus = false

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }

  // logout(): void {
  //   this.loggedInStatus = false;
  // }
  constructor(private http: HttpClient,private router : Router) { }

  checkLogin(){
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    // console.log(currentUser);
    if(currentUser != null){
      this.setLoggedIn(true);
      // console.log("hi");
      this.router.navigate(['']);  

    }else{
      this.setLoggedIn(false);
      this.router.navigate(['login']);  
      // this.logout();
    }
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  // getUserDetails(username, password) {
  //   console.log("hi");
  //   // post these details to API server return user info if correct
  //   return this.http.post<myData>('http://localhost:3005/login', {"email":username,"password": password})
  // }

}  