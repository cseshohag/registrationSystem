import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logOut(){
   this.authService.removeAccessToken();
   this.router.navigateByUrl('\login'); 
  }

  name : any;

  getName(){
    this.authService.currentUser.subscribe(res=>{
      this.name = res;
    })
  }
  
}
