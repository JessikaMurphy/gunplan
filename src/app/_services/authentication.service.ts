import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { 
    
  }
  login(username: string, password: string) {

    return this.http.post<any>('http://localhost:5000/api/auth/signin',
      {
        "usernameOrEmail": username,
        "password": password
      })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  addPaint(formattedPaintString: string){
    return this.http.put<any>('http://localhost:5000/api/user/me/add',
    formattedPaintString,)
    .pipe(map(response=> {
      if(response && response.ok)
      console.log(response.message);

    }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  

}
