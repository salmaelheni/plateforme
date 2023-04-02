import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import{MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilComponent } from './profil/profil.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UserComponent } from './user/user.component';
import { User2Component } from './user2/user2.component';
import { User3Component } from './user3/user3.component';
import { ValidationComponent } from './validation/validation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserService } from './shared/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Dialog1Component } from './dialog1/dialog1.component';
import { Dialog2Component } from './dialog2/dialog2.component';
import { Dialog3Component } from './dialog3/dialog3.component';
import { Dialog4Component } from './dialog4/dialog4.component';
import { Dialog5Component } from './dialog5/dialog5.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfilComponent,
    UserprofileComponent,
    UsergroupComponent,
    UserComponent,
    User2Component,
    User3Component,
    ValidationComponent,
    ForgetPasswordComponent,
    Dialog1Component,
    Dialog2Component,
    Dialog3Component,
    Dialog4Component,
    Dialog5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
