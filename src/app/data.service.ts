import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { NotifierModule } from 'angular-notifier';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  signup(form){
  	console.log(form);
  	return this.http.post('http://localhost:3005/signup',{form})
  }
  login(form){
  	// console.log(form);
  	return this.http.post('http://localhost:3005/login',{form})
  }
  displayContact(id){
    // console.log(id);
    return this.http.post('http://localhost:3005/contactlist',{"userid":id});
  }
  
  delete(form){
    // console.log(form.value);
    return this.http.post('http://localhost:3005/deletecontact',{form});
  }
  showProfile(id){
    // console.log(id);
    return this.http.post('http://localhost:3005/profile',{"userid":id});
  }
  addContact(form){
  	console.log(form);
    return this.http.post('http://localhost:3005/addcontact',{form});
  }
  updateContact(id) {  
    return this.http.post('http://localhost:3005/updatecontact',id);  
  } 
  contactbyId(id:any){
    return this.http.post('http://localhost:3005/contactbyid',{"id":id});
  }
  updateProfile(form){
    // console.log(form);
    return this.http.post('http://localhost:3005/updateprofile',{form});
  }
  changepwd(form){
    return this.http.post('http://localhost:3005/updatepassword',{form});
  }
  totalcontact(id:any){
    return this.http.post('http://localhost:3005/totalContacts',{"userId":id});
  }
}
