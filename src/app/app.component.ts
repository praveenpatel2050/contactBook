import { Component } from '@angular/core';
import { AuthService} from './auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contactbook';

  islogin : boolean
  public constructor(private auth : AuthService, private route : Router,private toast :ToastrService ) {  }

  ngOnInit() {
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    if(currentUser != null){
      this.islogin = true
    } else{
      this.islogin = false
    }
  //  console.log(this.islogin);
  //  console.log(currentUser);
  } 
  logout(){
    console.log(sessionStorage.getItem('current_user'));
    this.auth.setLoggedIn(false);
    sessionStorage.clear();
    this.toast.success('Logout Success.');
    location.reload();
    // this.route.navigate(['login']);
  }
    // logout(){
  //   // console.log(sessionStorage.getItem('current_user'));
  //   this.auth.setLoggedIn(false);
  //   sessionStorage.clear();
  //   location.reload();
  // }
    
}
