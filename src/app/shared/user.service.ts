import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User ={
    username: '',
    email: '',
    password: '',
    repassword:'',
    role:["user"],
    candidature:''
  };
  constructor( private http:HttpClient) { }


  getUserById(id : any){
    return this.http.get(`http://localhost:3000/api/users/search/${id}`);
  }
  getUser(user:User){
    return   this.http.get(environment.apiBaseUrl + '/users/')
    }
  postUser(user:User){
  console.log ('user',user)
     return  this.http.post('http://localhost:3000/api/users/register', user)

  }

  login(user:User){
    return this.http.post( 'http://localhost:3000/api/users/login',user );
  }
   setToken(token: any){
     localStorage.setItem('token', token)
    }
  resetPassword(candidater:User){
   return this.http.put(`http://localhost:3000/api/users/resetPassword`,candidater);}

}
