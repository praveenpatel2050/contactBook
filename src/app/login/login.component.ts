import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { DataService } from '../data.service';
// import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {StorageService, SESSION_STORAGE} from 'angular-webstorage-service';
import { AuthService } from '../auth/auth.service';
// const STORAGE_KEY = 'pure-awesomeness';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginresult : any=[]
  constructor(private data : DataService,private toast : ToastrService,private router : Router,@Inject(SESSION_STORAGE) private storage: StorageService,private auth : AuthService){}
  login(form){
  console.log(form.value);
  let email = form.value.email;
  let password = form.value.password;
  const expression = /\S+@\S+/
  var status = expression.test(String(email).toLowerCase());
  console.log(status);
  if(status){
    if(password!=''&&password!=undefined){
      this.data.login(form.value).subscribe(data =>
        {
          this.loginresult = data
          console.log(this.loginresult);
          if(this.loginresult.success == false){
            this.toast.error(this.loginresult.error);
          }else if(this.loginresult.success = 'true'){
            this.toast.success("Successfully Login!");
            
            var id = this.loginresult.data.id;
            var username = this.loginresult.data.email;
            var name = this.loginresult.data.name;
            let sessionvalue = {"id":id,"username":username,"name":name};
            sessionStorage.setItem("current_user",JSON.stringify(sessionvalue));
            this.auth.setLoggedIn(true);
            window.location.href = 'http://localhost:4200/';
            // this.router.navigate(['']);  
          }
          // console.log("Login Success.");
          // console.log(this.loginresult);
        });
      }else{
      this.toast.error("Must Enter YOur Password");
      }
    }else{
      this.toast.error("Enter your proper Emailid");
    }
  }
  ngOnInit() {
    this.auth.checkLogin();
    // console.log(a);
  }
  signup(){
    this.router.navigate(['/signup']);  
  }
}
