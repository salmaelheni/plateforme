
import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {


  User :any
  CurrentUser : any
  data :any
  token :any

  constructor(private _userService : UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.token =  localStorage.getItem('currentUser');

    this.data = jwt_decode(this.token)
    this.getCurrentUser(this.data.id);
  }

//   getCurrentUser(id :any){
//     this._userService.getUserById(id).subscribe(
//       res => {
//         console.log('res de type objet',res)
//       this.User = res
//       console.log('User de type any', this.User)
//       let data = Array(1)
//       data = this.User.data
//       console.log('data de type tableau',data)

// for (var i in data){
//   console.log('username',data[i].username)
//   this.CurrentUser = data[i].username
// }


//       },
//       error => {
//         console.log('erreur',error)
//       }
//     )
//   }

getCurrentUser(id :any){
  this._userService.getUserById(id).subscribe(
    res => {
      console.log('res de type objet',res)
      this.User = res
      console.log('User de type any', this.User)
      let data = Array(1)
      data = this.User.data
      console.log('data de type tableau',data)

      for (var i in data){
        console.log('username',data[i].username)
        this.CurrentUser = data[i].username
      }
    },
    error => {
      console.log('erreur',error)
      if (error.status === 401) {
        // handle 401 Unauthorized error
        console.log('Unauthorized error');
      } else {
        // handle other errors
        console.log('Error:', error.message);
      }
    }
  )
}

}
