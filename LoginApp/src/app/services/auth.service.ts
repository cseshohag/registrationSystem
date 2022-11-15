import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  baseServerUrl = "http://localhost:56679/api/";

  jwtHelperService = new JwtHelperService();
  registerUser(user: Array<String | null | undefined>) {
    return this.http.post(
      this.baseServerUrl + "User/CreateUser",
      {
      FirstName: user[0],
      LastName: user[1],
      Email: user[2],
      Mobile: user[3],
      Gender: user[4],
      Password: user[5]
    },
    {
      responseType: "text"
    });
  }

  loginUser(loginUser: Array<String | null | undefined>){
    return this.http.post(
      this.baseServerUrl + "User/LoginUser",
      {
      Email: loginUser[0],
      Password: loginUser[1]
    },
    {
      responseType: "text"
    });
  }

  setToken(token: string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
   }
   
   loadCurrentUser(){
    const token  = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;

    //console.log(userInfo);

    const data = userInfo ? {
      userId: userInfo.userId,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      mobile: userInfo.mobile,
      gender: userInfo.gender
    } : null;
    
    this.currentUser.next(data);
   }

   isLoggedIn(): boolean{
    return localStorage.getItem("access_token") ? true:false;
   }

   removeAccessToken(){
    localStorage.removeItem("access_token");
   }
}
