import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name : object
  total: any='';
  constructor(private auth : AuthService,private route: Router,private data : DataService) { }

  ngOnInit() {
    this.auth.checkLogin();
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    // var name = currentUser.name; // your token
    if(currentUser != null){
    this.name = currentUser.name
    }
    this.data.totalcontact(currentUser.id).subscribe(fetch_data =>{
      let resu:any = fetch_data;
      if(resu.success){
        this.total = resu.data.Total;
      }else{
        console.log(resu.error)
      }
      console.log(resu);
    });
  }
  // logout(){
  //   // console.log(sessionStorage.getItem('current_user'));
  //   this.auth.setLoggedIn(false);
  //   sessionStorage.clear();
  //   location.reload();
  // }
  createContact(){
    this.route.navigate(['addcontact']);
  }
  showContact(){
    this.route.navigate(['contactlist']);
  }
}
