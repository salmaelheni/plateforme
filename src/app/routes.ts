import {  Routes  } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserComponent } from './user/user.component';
import { User2Component } from './user2/user2.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { User3Component } from './user3/user3.component';
import { ValidationComponent } from './validation/validation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
export const appRoutes:Routes = [
    {path: '' ,component:HomeComponent},
   {path :'signup/:candidature' ,component: SignupComponent},
   {path: 'login' ,component:LoginComponent},
   {path:'userprofile' ,component:UserprofileComponent},
   {path:'questionnaire', component:UserComponent},
   {path: 'questionnaire2' ,component:User2Component},
   {path: 'usergroup' , component:UsergroupComponent},
   {path: 'questionnaire3' ,component:User3Component},
   {path: 'validation' ,component:ValidationComponent},
   {path:'forget-password',component:ForgetPasswordComponent }
]

