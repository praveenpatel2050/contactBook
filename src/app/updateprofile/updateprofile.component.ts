import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {FormGroup,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  profile :any
  constructor(private notify:ToastrService,private data:DataService,private route:Router) { }
  formdata :any; 
  ngOnInit() {
    let updateUserId = localStorage.getItem('updateUserId');
    this.data.showProfile(updateUserId).subscribe(fetch_data=>{
    this.profile =fetch_data;
      console.log(this.profile);
      if(this.profile.success){

        this.formdata = new FormGroup({
          name: new FormControl(this.profile.data.name),
          email: new FormControl(this.profile.data.email),
          phone:new FormControl(this.profile.data.phone),
          address:new FormControl(this.profile.data.address)
        });
      }else{
        alert("ERROR TO FIND Your PROFILE");
      }
    });
  }
  updateUser(form){
    console.log(form.value);
    let name = form.value.name.trim();
    let email = form.value.email.trim();
    let phone = form.value.phone.trim();
    let address = form.value.address.trim();
    let updateUserId = localStorage.getItem('updateUserId');
    const expression = /\S+@\S+/
    var status = expression.test(String(email).toLowerCase());
    // console.log(status);
    if(status){
    
      var data = {"name":name,"email":email,"phone":phone,"address":address,"userid":updateUserId};
        console.log(data);
      
      if(name!=''&&email!=''&&phone!=''&&address!=''){
        this.data.updateProfile(data).subscribe(response_data => {
          let data : any = response_data;
          console.log(data);
          if(data.success){
            this.profile = data.data;
            this.notify.success(data.data);
            localStorage.removeItem('updateUserId');
            this.route.navigate(['profile']);
          }else{
            this.notify.error(data.error);
          }
        })
      }else{
        this.notify.error("Fill ALL Fields")
      }
    }else{
      this.notify.error("Email is Not Proper Format");
    }
  }
}
