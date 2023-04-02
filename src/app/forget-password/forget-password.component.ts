import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import {first} from "rxjs/operators";
import { UntypedFormGroup,UntypedFormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1Component } from '../dialog1/dialog1.component';
import { Dialog2Component } from '../dialog2/dialog2.component';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  signInForm!: UntypedFormGroup;

  constructor(private userService:UserService,private router: Router ,public dialog: MatDialog,private fb:UntypedFormBuilder) { }

  model={
    email :'',
    password:'',

   };
  //emailRegex=/^(([^<>()\[\]\\.,;:\s@*]+(\.[^<>()\[\]\\.,;:\s@*]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ngOnInit(): void {
    this.createForm();
  }

  get f() {   return this.signInForm.controls;
  }
  createForm() {
    this.signInForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
    })

  }
  onSubmit(){
    this.userService.resetPassword(this.signInForm.value)
    .pipe(first())
    .subscribe(
      data => {
        let res : any = data
      if(res.status === 200) {
        // this.dialog.open(Dialog1Component);
        // alert("Votre mot de passe a été changer avec succées!Merci de vérifier votre Email.");
        this.dialog.open(Dialog1Component);
        this.router.navigateByUrl('/login');

        }else {

         alert("Adresse Email invalide");
        }
      },
      error => {
        this.dialog.open(Dialog2Component);
      });
  }

}
