import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
// import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any = null;
  constructor(private data : DataService,private router:Router) { }

  ngOnInit() {
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    var current_user = currentUser.id;
    this.data.showProfile(current_user).subscribe(response_data => {

      let data : any = response_data;
      console.log(data);

      if(data.success){
        this.users = data.data;
      }else{
        
      }
    });
  }

  updateProfile(userid:any){
    console.log(userid);
    localStorage.removeItem('updateUserId');  
    localStorage.setItem('updateUserId', userid.toString());
    this.router.navigate(['/updateprofile']);   
  }
  updatePassword(id){
    // console.log(id);
    localStorage.removeItem('updateUserId');  
    localStorage.setItem('updateUserId', id.toString());
    this.router.navigate(['/changepwd']); 
  }
}