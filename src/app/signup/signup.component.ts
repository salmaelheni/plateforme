import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

      emailRegex=/^(([^<>()\[\]\\.,;:\s@*]+(\.[^<>()\[\]\\.,;:\s@*]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      showSuccessMessage!:boolean;
      serverErrorMessage!:string;

      Candidature : any

      constructor(public userService:UserService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.Candidature = this.route.snapshot.paramMap.get('candidature');
  }

  onSubmit(form: NgForm){
    console.log("form", form.value.role)
    form.value.role = 'user'
    form.value.candidature= this.Candidature
    this.userService.postUser(form.value).subscribe(
        res=> { this.showSuccessMessage=true;

        setTimeout(() => this.showSuccessMessage=false,4000)
         this.resetForm(form);
        },
        err=>{
          if(err.status==422){
            this.serverErrorMessage=err.error.join('<br/>');
            } else
              this.serverErrorMessage ='Email déjà utilisé ';
        }
    );
}
     resetForm (form:NgForm) {
       this.userService.selectedUser ={
       username :'',
       email:'',
       password:'',
       repassword:'',
       role:["user"],
       candidature: ''
       };
       form.resetForm();
       this.serverErrorMessage='';
     }



  }


