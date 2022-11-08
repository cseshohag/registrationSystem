import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPassword: string='none';
  constructor() { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    firstname: new FormControl("",[Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z].*')]),
    lastname: new FormControl("",[Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z].*')]),
    email: new FormControl("",[Validators.required, Validators.email]),
    mobile: new FormControl("",[Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    gender: new FormControl("",[Validators.required]),
    pwd: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    rpwd: new FormControl("")
  });

  registerSubmit(){
    if(this.PWD.value == this.RPWD.value){
      console.log(this.registerForm.valid);
      this.repeatPassword = 'none';
    }else{
      this.repeatPassword = 'inline';
    }
  }

  get FirstName(): FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName(): FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  get PWD(): FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }
  get RPWD(): FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }
}
