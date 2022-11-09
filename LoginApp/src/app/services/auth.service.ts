import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "http://localhost:56679/api/";

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
}
