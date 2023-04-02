import { UserService } from './../shared/user.service';
import { Candidat } from './../shared/candidat';
import { FormulairesService } from './../shared/formulaires.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiants';
import { MatDialog } from '@angular/material/dialog';
import { Dialog4Component } from '../dialog4/dialog4.component';
import { Dialog5Component } from '../dialog5/dialog5.component';
import { Dialog3Component } from '../dialog3/dialog3.component';


import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  EtudiantForm!:UntypedFormGroup;
  date = new Date();
  model!:Etudiant;
  etudiant =false;
  diplome =false;
image : any
  fileName !: any;
  images : any;
  tab:any
  currentUser :any;
  data : any
  candidature: any
  Equipe = false
  file : any
  imageData : any

  autorise = true
master !: boolean;
 licence = true
d = new Date();
dd = this.d.getFullYear()+'/'+(this.d.getFullYear()+1);


  constructor(private fb: UntypedFormBuilder, private router : Router,public dialog: MatDialog, private formulaireService : FormulairesService, private userService : UserService) { }

  ngOnInit(): void {
   this.CurrentUser();
  this.getUser();
  this.setInputsVal();
    this.createForm();
  }
  get f() {   return this.EtudiantForm.controls;
  }

  CurrentUser(){
    ///// current user va contenir le token
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
     this.logout();
   }
    ///// data va contenir le token décoder
    this.data = jwt_decode(this.currentUser)
    this.userService.getUserById(this.data.id).subscribe(
      res => {
        let result : any = res

        if(result.data[0].candidature == 'Equipe avec idée de projet')
        {
          this.Equipe = true
        }else{
          this.Equipe = false
        }

      })
  }
  getUser(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {

        let result : any = res;
        console.log('reponseee',result.data[0])
        if(result.data[0].Reponse == 'envoye'){

          this.router.navigateByUrl(`/validation`);
        }
      })
      }

  createForm() {
    this.EtudiantForm = this.fb.group({
      _id: [this.data.id],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      nationalite: ['', Validators.required],
      age: ['', Validators.required],
      genre: ['', Validators.required] ,
      Phone: ['',[Validators.required, Validators.pattern('[0-9.]*') ]],
      email: ['',[Validators.required, Validators.email]],
      lienfb: ['', [Validators.required]],
      LienLinkedIn: [''],
      Situation: ['', Validators.required],
      Institution: ['', Validators.required],
      Domaine: ['', Validators.required],
      Departement: ['', Validators.required],
      Niveau: ["Sélectionner votre niveau d'étude", Validators.required],
      image : [],
      Annee: ['' ,Validators.required],

    })

  }

  /////// methode s'éxecute lors de l'envoi de la formualire et selon le type de candidature va etre naviguer vers un url /////
  onSubmit() {
    if(this.EtudiantForm.value.lienfb.indexOf('facebook') != -1)
    {
      if(this.fileName != undefined)
      {
        console.log('submiiiit', this.EtudiantForm.value.lienfb)
        var div = document.getElementById("0");
        console.log('fileee',div)
            this.formulaireService.getUserQuest(this.data.id).subscribe(
              res => {
              let result : any = res
                if(result.data[0] != undefined)
                {
                  this.formulaireService.UpdateUserProfile(this.EtudiantForm.value).subscribe(
                    res => {this.navigate()
                    this.sendImage()




                    },
                    error => {
                      console.log('error',error)
                    }
                  )
                }else
                {
                  this.userService.getUserById(this.EtudiantForm.value._id).subscribe(
          res => {
            let user : any = res;
            console.log('dataaaaaaa',user.data[0].candidature)
            if(user.data[0].candidature == 'Individu avec compétences')
            {console.log('aaaaaaaa')
             this.formulaireService.postUserProfile(this.EtudiantForm.value).subscribe(
              res => {

                this.sendImage()

                // si type candidature individu avec compétences va se rediger ver /questionnaire
                this.router.navigateByUrl(`/questionnaire`);
              },
              error => {
                console.log('error',error)
              }
            )
            }else
            if(user.data[0].candidature == 'Individu avec idée de projet'){
              this.formulaireService.postUserProfile(this.EtudiantForm.value).subscribe(
              res => {
                this.sendImage()
                // si type candidature individu avec idée de projet va se rediger ver /questionnaire2
                this.router.navigateByUrl(`/questionnaire2`);
              },
              error => {
                console.log('error',error)
              }
            )
            }else
            if(user.data[0].candidature == 'Equipe avec idée de projet'){
              this.formulaireService.postUserProfile(this.EtudiantForm.value).subscribe(
              res => {
                this.sendImage()
                // si type candidature équipe avec idée va se rediger ver /usergroup
                this.router.navigateByUrl(`/usergroup`);
              },
              error => {
                console.log('error',error)
              }
            )
            }

          }
        )}
              })




      }else{
        this.dialog.open(Dialog4Component);
      }
         }else{
          this.dialog.open(Dialog5Component);

    }

  }


  navigate(){
    this.userService.getUserById(this.data.id).subscribe(
      res => {
        let user : any = res;
        if(user.data[0].candidature == 'Individu avec compétences')
        {
          this.router.navigateByUrl(`/questionnaire`);
        }else
        if(user.data[0].candidature == 'Individu avec idée de projet'){
          this.router.navigateByUrl(`/questionnaire2`);
        }else
    if(user.data[0].candidature == 'Equipe avec idée de projet'){
      this.router.navigateByUrl(`/usergroup`);
    }
      })
  }

  selectImage(event : any){

    console.log('file selected')
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName = file.name
      this.images = file;

      }

  }

  sendImage()
{
  const formData = new FormData();

  formData.append('file', this.images);

this.formulaireService.sendFile(formData, this.data.id, this.fileName).subscribe(
  (res) => {
    console.log(res)

},

  (err) => console.log(err)
)
}


  Situation(){
    if(this.EtudiantForm.value.Situation == 1)
    {
      this.diplome = true;
      this.etudiant = false;
//       this.master = true
// this.licence = false
    }else{
      if(this.EtudiantForm.value.Situation == 0)
      {
        this.etudiant = true;
        this.diplome = false;
  //       this.master = false
  // this.licence = true
      }
    }

  }



  ////// methode pour affecter les valeurs trouver dans la bd saisi par l'utilisateur dans les input de la forme QuestForm
  setInputsVal(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {

        this.candidature = res ;

        this.tab = this.candidature.data

        for(var i in this.tab)
        {
          this.Situation();


         let d = new Date(JSON.parse(JSON.stringify(this.tab[i].age)) )
         let years = d.getUTCFullYear()

         let month : any = d.getUTCMonth()+1
         if(month < 10)
         month = '0'  + month
         let day : any = d.getUTCDate()
         if(day < 10)
         day = '0' + day
         let date = years + '-' + month + '-' + day


     this.image = this.tab[i].image
         // formData.append('file',  );



         if(this.tab[i].Domaine == 'Licence monnaie finance banque assurance' || this.tab[i].Domaine =='Licence commerce et finance internationale' ||
         this.tab[i].Domaine == 'Licence analyse et politique économique' || this.tab[i].Domaine == 'Licence en busines computing : business intelligence' ||
         this.tab[i].Domaine == 'Licence ingénierie économique et financière' || this.tab[i].Domaine == 'Licence marketing' ||
         this.tab[i].Domaine == 'Licence comptabilité' || this.tab[i].Domaine == 'Licence finance' || this.tab[i].Domaine == 'Licence management')
         {
           this.licence = true
         }else{
           this.licence = false
         }

         if(this.tab[i].Situation == 0){
           this.etudiant = true
           this.diplome = false
         }else{
           this.etudiant = false
           this.diplome = true
         }

          this.EtudiantForm = this.fb.group({
          _id: [this.data.id],
          name: [(this.tab[i].name), Validators.required],
          prenom: [(this.tab[i].prenom), Validators.required],
          nationalite: [this.tab[i].nationalite,Validators.required],
          age: [date  , Validators.required],
          genre: [this.tab[i].genre,Validators.required],
          Phone: [this.tab[i].Phone,Validators.required],
          email: [this.tab[i].email, Validators.required],
          lienfb: [this.tab[i].lienfb, Validators.required],
          LienLinkedIn: [this.tab[i]. LienLinkedIn],
          Situation:     [JSON.parse(this.tab[i].Situation), Validators.required],
          Institution:  [(this.tab[i].Institution), Validators.required],
          Domaine: [this.tab[i].Domaine, Validators.required],
          Departement: [(this.tab[i].Departement), Validators.required],
          image : [],
          Annee: [(this.tab[i].Annee), Validators.required],
          Niveau: [(this.tab[i].Niveau), Validators.required],
        })
      }

      }

    )
     }






    VerifDate(event : any){
      let d = new Date()
      let date = d.getFullYear()
      let dd = event.target.value.substring(5,9)
      console.log('dateeee',dd,'ghjhjj',date)
     if(dd >= date -2 && dd <=  date + 2 || dd == date )
     {
      this.autorise = true
     }else{
      this.autorise = false
      this.dialog.open(Dialog3Component);
     }
    }


    Domaine(event : any){
      console.log('ghhgghhggh',event.target.value)
      if(event.target.value == 'Licence monnaie finance banque assurance' || event.target.value =='Licence commerce et finance internationale' ||
      event.target.value == 'Licence analyse et politique économique' || event.target.value == 'Licence en busines computing : business intelligence' ||
      event.target.value == 'Licence ingénierie économique et financière' || event.target.value == 'Licence marketing' ||
      event.target.value == 'Licence comptabilité' || event.target.value == 'Licence finance' || event.target.value == 'Licence management')
      {
        console.log('hjhjhjjhhjhjhjhjhj')
        this.licence = true
      }else{
        this.licence = false
      }
    }

      logout(){
        localStorage.removeItem('currentUser')
        this.router.navigateByUrl('/')
      }

}
