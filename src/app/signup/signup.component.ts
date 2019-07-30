import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
form : any
  	constructor(private Data : DataService,private route:Router,private notify:ToastrService) { }
  
  	signup(form:any){
		console.log(form.value);
		let name = form.value.name;
		let email = form.value.email;
		let phone = form.value.phone;
		let address = form.value.address;
		if(name!=undefined&&phone!=undefined&&address !=undefined&&phone!=undefined){
      		if(name.trim() !=''&& email.trim()!=''&&address.trim()!=''&&phone.trim()!=''){
		  		this.Data.signup(form.value).subscribe(data => {
					this.form = data
					console.log(this.form);
					if(this.form.success== true){
						this.notify.success(this.form.data);
						this.route.navigate(['login']);
					}else{

						this.notify.error(this.form.error);
					}
				});
			}else{
				this.notify.error('Entered Value is not Valid');
			}
		}else{
			this.notify.error('Value Must be Filled');
		}
  	}
  ngOnInit() { }

}
