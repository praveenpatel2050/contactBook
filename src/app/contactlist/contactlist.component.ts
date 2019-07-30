import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
 
  constructor(private data : DataService, private router : Router,private toastr:ToastrService) { }
  users: Object;
  ngOnInit() {
    var currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    var current_user = currentUser.id;
    this.data.displayContact(current_user).subscribe(response_data => {

    let data : any = response_data;
    this.users = data.data
    console.log(data);

    });
  }
  deleteRecord(id){
    let currentUser = JSON.parse(sessionStorage.getItem('current_user'));
    let current_user = currentUser.id;
    var form ={"contact_id":id,"current_user":current_user}; 
    console.log(form);
      if(confirm("Are you sure to delete this record ?")) {
        this.data.delete(form).subscribe(response_data =>{
            let data :any = response_data;
            console.log(data);
            if(data.success == true){
               this.toastr.success(data.data);
               this.data.displayContact(current_user).subscribe(response_data => {
                let data : any = response_data;
                this.users = data.data
                console.log(data);
              });
            }else{
              this.toastr.error(data.error);
            }
        });	
      }
   
  }
  gotonewcontact(){
    this.router.navigate(['/addcontact']);    
  }

  editRecord(recordId:number){
    console.log(recordId);
    localStorage.removeItem('editEmpId');  
    localStorage.setItem('editEmpId', recordId.toString());
    this.router.navigate(['/editcontact']);   
  }
}
