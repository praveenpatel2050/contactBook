import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { DataService } from './data.service';

/* @Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
 */
interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  isLoggedIn(): Observable<isLoggedIn> {
    var session = JSON.parse(sessionStorage.getItem('current_user'));
    if(session!=''){
      // return ({"status":true});
    }else{
      // return ({"status":false});
    }
  console.log(session);
  // return ("status":true);
  // return isLoggedin = true; 
    return this.http.get<isLoggedIn>('http://localhost:3005/isLogin')
  }

  // logout() {
  //   return this.http.get<logoutStatus>('/api/logout.php')
  // }

}