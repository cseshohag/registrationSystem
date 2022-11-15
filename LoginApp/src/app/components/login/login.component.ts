import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
   loginForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    pwd: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(20)])
   });
   isUserValid: boolean = false;
   loginSubmited(){
    this.loginAuth.loginUser([
      this.loginForm.value.email,
      this.loginForm.value.pwd
    ]).subscribe(response =>{
      if(response == "Failed"){
        this.isUserValid = false;
        alert('User Name or Password Incorrect!');
      }else{
        this.isUserValid = true;
        this.loginAuth.setToken(response);
        this.router.navigateByUrl('home');
      }
    });
   }

   
   get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
   }

   get PWD(): FormControl{
    return this.loginForm.get('pwd') as FormControl;
   }
}
