import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  currentUser :any
  data: any

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  CurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
      this.logout();
    }
    this.data = jwt_decode(this.currentUser)
  }
  logout(){
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('/')
  }
}
