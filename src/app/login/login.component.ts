import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor( private userService:UserService, private router: Router   ) { }

  erreur : any

  model={
   email :'',
   password:'',

  };

  emailRegex=/^(([^<>()\[\]\\.,;:\s@*]+(\.[^<>()\[\]\\.,;:\s@*]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages!:string;

  ngOnInit(): void {
  }

  onSubmit(form :NgForm){
    console.log('loginForm',form)
    this.userService.login(form.value).subscribe(
      res => {
          this.userService.setToken(['token']);
          this.router.navigateByUrl('/userprofile');
          localStorage.setItem('currentUser', JSON.stringify(res));
      },
      err=>{
        console.log('erreur',err.error.errors)
        this.erreur = err.error.errors;
        if(err.status==422){
          this.serverErrorMessages=err.error.join('<br/>');
          } else
            this.serverErrorMessages =this.erreur;

      }
    );
  }



}
