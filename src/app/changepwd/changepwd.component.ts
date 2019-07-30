import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  status : any = null
  constructor(private data:DataService,private notify:ToastrService,private route:Router) { }

  ngOnInit() {
    let userid = localStorage.getItem('updateUserId');  
    if(!userid){
      this.route.navigate(['profile']);
    }
  }
  changepwd(form){
    let userid = localStorage.getItem('updateUserId');  
    let password = form.value.password;
    var data = {"userid":userid,"password":password};
    this.data.changepwd(data).subscribe(result_data=>{
        let fetch :any = result_data;
        if(fetch.success){
          this.notify.success(fetch.data);
          localStorage.removeItem('updateUserId');
          this.route.navigate(['profile']);
        }else{
          this.notify.error(fetch.error);
        }
    });
    // console.log(data);
  }
}
