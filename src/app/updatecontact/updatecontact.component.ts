import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import { FormGroup ,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit {
    constructor(private data : DataService,private route :Router,private notify:ToastrService) { }
    // updateForm:FormGroup
    contactid :any
    users : any
  ngOnInit() {
  //   this.updateForm = new FormGroup({
  //     name: new FormControl(),
  //     phone:new FormControl(),
  //     address:new FormControl(),
  //     email:new FormControl()
  //  });
  this.contactid = localStorage.getItem('editEmpId');
  if(!this.contactid){
    this.route.navigate(['/contactlist']);

  }    
  // this.data.contactbyId(contactid).subscribe( response_data => {
  //   let data : any = response_data;
  //   console.log(data);
  //   if(data.success){
  //    this.updateForm.get(name).patchValue("Hello");
    //    {
    //    name :data.name,
    //    email:data.email,
    //    address:data.address,
    //    phone:data.phone
    //  });
    // }
  // });
  }
  updateContact(form:any){
    // console.log(form.value);
    let name = form.value.name;
    let email = form.value.email;
    let phone = form.value.phone;
    let address = form.value.address;
    let contactid = localStorage.getItem('editEmpId');
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    let current_user = currentUser.id;
    var update = {"name":name,"email":email,"phone":phone,"address":address,"contactid":contactid,"currentUser":current_user} ;
    console.log(update);
    if(name !=''&&email != '' &&phone !='' && name!=undefined && email!=undefined &&phone !=undefined && address!=undefined && address!=''){
      this.data.updateContact(update).subscribe(response_data => {
        let data : any = response_data;
        console.log(data);
        if(data.success){
          this.users = data.data;
          this.notify.success(data.data);
          localStorage.removeItem('editEmpId');
          this.route.navigate(['contactlist']);
        }else{
          this.notify.error(data.error);
        }
      });
    }else{
      this.notify.error('Enter all fields');
    }
    
  }
}
