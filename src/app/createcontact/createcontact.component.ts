import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
// import { from } from 'rxjs';
@Component({
  selector: 'app-createcontact',
  templateUrl: './createcontact.component.html',
  styleUrls: ['./createcontact.component.css']
})
export class CreatecontactComponent implements OnInit {
  form : Object
  contactCreatForm : FormGroup
  constructor(private data : DataService,private toastr : ToastrService,private route : Router) { }
  contactNew(form){
    console.log(form.value);
    let name = form.value.name;
    let email = form.value.email;
    let address = form.value.address;
    let phone = form.value.phone;
    if(name!=undefined&&phone!=undefined&&address !=undefined&&phone!=undefined){

      if(name.trim() !=''&& email.trim()!=''&&address.trim()!=''&&phone.trim()!=''){
        var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
        let current_user = currentUser.id;
        var from = {"name":name.trim(),"email":email.trim(),"address":address.trim(),"phone":phone.trim(),"current_user":current_user};
        console.log(from);
        this.data.addContact(from).subscribe(response_data =>{
          let data :any = response_data;
          console.log(data);
          if(data.success == true){
            this.toastr.success(data.data); 
            this.route.navigate(['contactlist']);          
          }else{
            this.toastr.error(data.error);
            // this.form.reset();
          }
        }); 
      }else{
      this.toastr.error("Some Fields are not in Proper Format");
      }
    }else{
      this.toastr.error("Please Fill All Fields");
    }
  
    
    // location.reload();
  }
  ngOnInit() {  }
}