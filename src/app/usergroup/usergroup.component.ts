import { FormulairesService } from '../shared/formulaires.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../etudiants';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
  Etudiant1Form!: UntypedFormGroup;

  Etudiant2Form!: UntypedFormGroup;

  Etudiant3Form!: UntypedFormGroup;
master !: boolean
licence = true

facebook1 !: boolean
facebook2 !: boolean
facebook3 !: boolean

d = new Date();
dd = this.d.getFullYear()+'/'+(this.d.getFullYear()+1);


alertFichier = 0
alertFb = 0

  autorise = true
  Ajout1 = false
  Ajout2 = false
  nb = 0
  form : any

  different = false

  etudiant1 = false;
  diplome1 = false;

  etudiant2 = false;
  diplome2 = false;

  etudiant3 = false;
  diplome3 = false;

  fileName !: string;
  images : any;

  fileName2 !: string;
  images2 : any;

  fileName3 !: string;
  images3 : any;

  candidature : any;

  currentUser : any;
  data :any;

  serverErrorMessages : any

  test : any

  TabMembres : any
  tab : any

  form1 = false;
  form2 = false;
  form3 = false;

  updated = false;

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private router : Router,private formulaireService : FormulairesService) { }

  ngOnInit(): void {
    this.CurrentUser();
    this.Test();
    this.getMembre();

    this.createForm1();
    this.createForm2();
    this.createForm3();
  }

  CurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
      this.logout();
    }
    this.data = jwt_decode(this.currentUser)
    console.log('dataaa',this.data.id)
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
    alert("Vous n'êtes pas conçu pour participer à cette compétition")
   }
  }



  getMembre()
  {
    //// si le chef déquipe a rempli le formulaire des membres d'équipe il va naviguer ver le questionnaire 3
    this.formulaireService.getMembre(this.data.id).subscribe(
      res => {
        let membres : any = res
        this.TabMembres = membres.data
        console.log('length',membres.data.length)
        if(membres.data.length >= 1)
        {
          this.setInputsVal1(this.TabMembres[0]._id);
          this.form1 = true
        }

        if(membres.data.length >= 2){

          this.Ajout1 = true
    this.setInputsVal2(this.TabMembres[1]._id);
    this.form2 = true
        }

    if(membres.data.length == 3){
      this.Ajout2 = true
   this.setInputsVal3(this.TabMembres[2]._id);
   this.form3 = true
    }

      /// if(membres.data.length !== 0){
         //this.router.navigateByUrl('/questionnaire3')
    ////   }
      }
    )
  }

  get f() { return this.Etudiant1Form.controls ; }
  get f2() { return this.Etudiant2Form.controls ; }
  get f3() { return this.Etudiant3Form.controls ; }


  setInputsVal1(id :any){
    this.formulaireService.FindMembre(id).subscribe(
      res => {

        this.candidature = res ;

        this.tab = this.candidature.data

        for(var i in this.tab)
        {
          this.SituationMembre1();


         let d = new Date(JSON.parse(JSON.stringify(this.tab[i].age)) )
         let years = d.getUTCFullYear()
         let month : any = d.getUTCMonth()+1
         if(month < 10)
         month = '0'  + month
         let day : any = d.getUTCDate()
         if(day < 10)
         day = '0' + day
         let date = years + '-' + month + '-' + day

          console.log('affichage de la date',this.tab[i].Situation)

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
            this.etudiant1 = true
            this.diplome1 = false
          }else{
            this.etudiant1 = false
            this.diplome1 = true
          }

          this.Etudiant1Form = this.fb.group({
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
          Annee: [(this.tab[i].Annee), Validators.required],
          Niveau: [(this.tab[i].Niveau), Validators.required],


        })
      }

      }

    )
     }

     SituationMembre1(){
      if(this.Etudiant1Form.value.Situation == 1)
      {
        this.diplome1 = true;
        this.etudiant1 = false;
      }else{
        if(this.Etudiant1Form.value.Situation == 0)
        {
          this.etudiant1 = true;
          this.diplome1 = false;
        }
      }

    }

    setInputsVal2(id :any){
      this.formulaireService.FindMembre(id).subscribe(
        res => {

          this.candidature = res ;

          this.tab = this.candidature.data

          for(var i in this.tab)
          {
            this.SituationMembre2();


           let d = new Date(JSON.parse(JSON.stringify(this.tab[i].age)) )
           let years = d.getUTCFullYear()
           let month : any = d.getUTCMonth()+1
         if(month < 10)
         month = '0'  + month
         let day : any = d.getUTCDate()
         if(day < 10)
         day = '0' + day
         let date = years + '-' + month + '-' + day

            console.log('affichage de la date',date)

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
              this.etudiant2 = true
              this.diplome2 = false
            }else{
              this.etudiant2 = false
              this.diplome2 = true
            }

            this.Etudiant2Form = this.fb.group({
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
            Annee: [(this.tab[i].Annee), Validators.required],
            Niveau: [(this.tab[i].Niveau), Validators.required],


          })
        }

        }

      )
       }

    SituationMembre2(){
      if(this.Etudiant2Form.value.Situation == 1)
      {
        this.diplome2 = true;
        this.etudiant2 = false;
      }else{
        if(this.Etudiant2Form.value.Situation == 0)
        {
          this.etudiant2 = true;
          this.diplome2 = false;
        }
      }

    }

    setInputsVal3(id : any){
      this.formulaireService.FindMembre(id).subscribe(
        res => {

          this.candidature = res ;

          this.tab = this.candidature.data

          for(var i in this.tab)
          {
            this.SituationMembre3();


           let d = new Date(JSON.parse(JSON.stringify(this.tab[i].age)) )
           let years = d.getUTCFullYear()
           let month : any = d.getUTCMonth()+1
         if(month < 10)
         month = '0'  + month
         let day : any = d.getUTCDate()
         if(day < 10)
         day = '0' + day
         let date = years + '-' + month + '-' + day

            console.log('affichage de la date',date)


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
              this.etudiant3 = true
              this.diplome3 = false
            }else{
              this.etudiant3 = false
              this.diplome3 = true
            }

            this.Etudiant3Form = this.fb.group({
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
            Annee: [(this.tab[i].Annee), Validators.required],
            Niveau: [(this.tab[i].Niveau), Validators.required],


          })
        }

        }

      )
       }

    SituationMembre3(){
      if(this.Etudiant3Form.value.Situation == 1)
      {
        this.diplome3 = true;
        this.etudiant3 = false;
      }else{
        if(this.Etudiant3Form.value.Situation == 0)
        {
          this.etudiant3 = true;
          this.diplome3 = false;
        }
      }

    }

  createForm1() {
    this.Etudiant1Form = this.fb.group({
      IdChefProjet : [this.data.id],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      nationalite: ['',Validators.required],
      age: ['', Validators.required],
      genre: [''] ,
      Phone: ['', [Validators.required, Validators.pattern('[0-9.]*')]],
      email: ['', [Validators.required, Validators.email]],
      lienfb: ['',Validators.required],
      LienLinkedIn: [''],
      Situation: ['',Validators.required],
      Institution: ['', Validators.required],
      Domaine: ['', Validators.required],
      Departement: ['', Validators.required],
      Niveau: ["Sélectionner votre niveau d'étude", Validators.required],
      Annee: ['', Validators.required],



    })
  }

  createForm2() {
    this.Etudiant2Form = this.fb.group({
      IdChefProjet : [this.data.id],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      nationalite: ['',Validators.required],
      age: ['', Validators.required],
      genre: [''] ,
      Phone: ['', [Validators.required, Validators.pattern('[0-9.]*')]],
      email: ['', [Validators.required, Validators.email]],
      lienfb: ['',Validators.required],
      LienLinkedIn: [''],
      Situation: ['',Validators.required],
      Institution: ['', Validators.required],
      Domaine: ['', Validators.required],
      Departement: ['', Validators.required],
      Niveau: ["Sélectionner votre niveau d'étude", Validators.required],
      Annee: ['', Validators.required],



    })
  }


  createForm3() {
    this.Etudiant3Form = this.fb.group({
      IdChefProjet : [this.data.id],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      nationalite: ['',Validators.required],
      age: ['', Validators.required],
      genre: [''] ,
      Phone: ['', [Validators.required, Validators.pattern('[0-9.]*')]],
      email: ['', [Validators.required, Validators.email]],
      lienfb: ['',Validators.required],
      LienLinkedIn: [''],
      Situation: ['',Validators.required],
      Institution: ['', Validators.required],
      Domaine: ['', Validators.required],
      Departement: ['', Validators.required],
      Niveau: ["Sélectionner votre niveau d'étude", Validators.required],
      Annee: ['', Validators.required],



    })
  }


  onSubmit1() {
    ////// le service postMembre ne s'éxecute que si le formulaire Etudiant1Form est valide
  // console.log('alerttt',this.alertFichier)
    if(this.fileName != undefined)
    {
if(this.form1 == true && this.different == true){
 // console.log('differerytttttttt',this.different)
  if(this.Etudiant1Form.value.lienfb.indexOf('facebook') != -1)
  {
    //console.log('facebook1', this.facebook1, '111111111111')
    this.facebook1 = true
    //console.log('facebook1', this.facebook1, '222222222')
      this.formulaireService.getMembre(this.data.id).subscribe(
        res => {
          let membres : any = res
          this.TabMembres = membres.data
            this.formulaireService.UpdateMembre(this.TabMembres[0]._id, this.Etudiant1Form.value).subscribe(
             res => {
              console.log('diiiiifffffff11111111111111',this.different)
               if(this.Ajout1 == false && this.different == true)
               this.router.navigateByUrl(`/questionnaire3`);
             }
            )
        })
      }else{
        this.facebook1 = false

        if(this.alertFb == 0)
        alert("Lien facebook du 1er membre n'est pas valide")
         this.alertFb = this.alertFb +1
      }
    }else
    if(this.Etudiant1Form.valid == true)
    {
      if(this.Etudiant1Form.value.lienfb.indexOf('facebook') != -1)
    {
      //console.log('facebook1', this.facebook1, '111111111111')
      this.facebook1 = true
      //console.log('facebook1', this.facebook1, '2222222222222')
      if(this.different == true){
      this.formulaireService.PostMembre(this.Etudiant1Form.value).subscribe(
      res => {
        let data : any = res;
        console.log('Membre1 ajouté')
        if(this.Ajout1 == false)
        console.log('diiiiifffffff111111',this.different)
        this.router.navigateByUrl(`/questionnaire3`);
        this.sendImage(this.images, this.fileName,data.data._id);
      }
    )
    }
    }else{
      if(this.alertFb == 0)
      alert("Lien facebook du 1er membre n'est pas valide")
      this.facebook1 = false
      this.alertFb = this.alertFb +1

    }

    }}else{
      if(this.alertFichier == 0)
      if(this.etudiant1 == true)
      alert("Veuillez sélectionner l'inscription de l'année universitaire en cours du 1er membre s'il vous plaît!")
      else{
        alert("Veuillez sélectionner le dernier diplôme obtenu du 2éme membre s'il vous plaît!")


      }
      this.alertFichier = this.alertFichier +1
     // console.log('11111111111111111',this.alertFichier)

    }




  }
  onSubmit2() {
    if(this.fileName2 != undefined)
    {
    if(this.form2 == true && this.different == true){
      if(this.Etudiant2Form.value.lienfb.indexOf('facebook') != -1)
      {
        this.facebook2 = true
        //console.log('facebook2', this.facebook2, '2222222222222')
      this.formulaireService.getMembre(this.data.id).subscribe(
        res => {
          let membres : any = res
          this.TabMembres = membres.data
            this.formulaireService.UpdateMembre(this.TabMembres[1]._id,this.Etudiant2Form.value).subscribe(
             res => {
              console.log('diiiiifffffff2222222222222',this.different)
               if(this.Ajout2 == false && this.different == true)

               this.router.navigateByUrl(`/questionnaire3`);
             }
            )
        })
      }else{
        //console.log('bbbbbbbbbbbbbbbbb',this.alertFb,this.Ajout1 == true )
         if(this.alertFb == 0 && this.Ajout1 == true)
        alert("Lien facebook du 2éme mebmre n'est pas valide")
        this.facebook2 = false
        this.alertFb = this.alertFb +1

      }
    }else
    ////// le service postMembre ne s'éxecute que si le formulaire Etudiant2Form est valide
    if(this.Etudiant2Form.valid == true)
    if(this.Etudiant2Form.value.lienfb.indexOf('facebook') != -1)
    {
      this.facebook2 = true
     // console.log('facebook2', this.facebook2, '2222222222222')
    if(this.different == true){
    this.formulaireService.PostMembre(this.Etudiant2Form.value).subscribe(
      res => {
        console.log('Membre2 ajouté')
        console.log('diiiiifffffff22222222',this.different)
        if(this.Ajout2 == false)
        this.router.navigateByUrl(`/questionnaire3`);
        let data : any = res;
        this.sendImage(this.images2, this.fileName2, data.data._id);
      }
    )}
    }else{
      //console.log('hjjhhjkkkkkkkkkkkkkkkkkkkk')
    if(this.alertFb == 0 && this.Ajout1 == true)
    alert("Lien facebook du 2éme membre n'est pas valide")
    this.facebook2 = false
    this.alertFb = this.alertFb+1

  }
  }else{if(this.alertFichier == 0 && this.Ajout1 == true)
      if(this.etudiant2 == true)
      alert("Veuillez sélectionner l'inscription de l'année universitaire en cours du 2éme membre s'il vous plaît!")
      else{
        alert("Veuillez sélectionner le dernier diplôme obtenu du 2éme membre s'il vous plaît!")


      }
      this.alertFichier = this.alertFichier +1
      //console.log('2222222222',this.alertFichier)

    }
  }

  onSubmit3() {
    //console.log('alerttt',this.alertFichier)
    if(this.fileName3 != undefined)
    {
    if(this.form3 == true && this.different == true){
      if(this.Etudiant3Form.value.lienfb.indexOf('facebook') != -1)

    {
      //console.log('facebook3', this.facebook3, '1111111111111')
      this.facebook3 = true
     // console.log('facebook3', this.facebook3, '2222222222222')
      this.formulaireService.getMembre(this.data.id).subscribe(
        res => {
          let membres : any = res
          this.TabMembres = membres.data
            this.formulaireService.UpdateMembre(this.TabMembres[2]._id,this.Etudiant3Form.value).subscribe(
             res => {
               console.log('diiiiifffffff33333333333',this.different)
              // console.log('facebooook1',this.facebook1, 'facebooook2', this.facebook2)
               if(this.facebook1 == true && this.facebook2 == true && this.different == true)
               this.router.navigateByUrl(`/questionnaire3`);
             }
            )
        })
      }else{
        //console.log('hjjjjjjjjjjjjjjjjjjjjjjj')
        this.facebook3 = false

        if(this.alertFb == 0 && this.Ajout2 == true)
        alert("Lien facebook du 3éme membre n'est pas valide")
         this.alertFb = this.alertFb +1
      }

  }else
    ////// le service postMembre ne s'éxecute que si le formulaire Etudiant3Form est valide
    if(this.Etudiant3Form.valid == true)
    if(this.Etudiant3Form.value.lienfb.indexOf('facebook') != -1)

    {
      //console.log('facebook3', this.facebook3, '1111111111111')
      this.facebook3 = true
     // console.log('facebook3', this.facebook3, '2222222222222')
    if(this.different == true){
    this.formulaireService.PostMembre(this.Etudiant3Form.value).subscribe(
      res => {
        console.log('Membre3 ajouté')
        console.log('diiiiifffffff3333333333',this.different)
        //if(this.facebook1 == true && this.facebook2 == true)
        this.router.navigateByUrl(`/questionnaire3`);

        let data : any = res;
        this.sendImage(this.images3, this.fileName3, data.data._id );
      }
    )}
  }else{
    //console.log('000000000000000000')
    if(this.alertFb == 0 && this.Ajout2 == true)
    alert("Lien facebook du 3éme mebmre n'est pas valide")
    this.facebook3 = false
    this.alertFb = this.alertFb+1

  }}else{
     if(this.alertFichier == 0 && this.Ajout2 == true)
     if(this.etudiant3 == true)
    alert("Veuillez sélectionner l'inscription de l'année universitaire en cours du 3éme membre s'il vous plaît!")
    else{
      alert("Veuillez sélectionner le dernier diplôme obtenu du 3éme membre s'il vous plaît!")

    }
    this.alertFichier = this.alertFichier+1
  //  console.log('333333333333',this.alertFichier)

  }
}


////// methode liée au click sur bouton suivant
  onSubmit() {
    //// exécution des 3 methodes liée à l'envoi des trois formulaire EtudiantForm
   this.alertFb = 0
   this.alertFichier = 0
    this.TestSpecialite()
    console.log('hghhgjfjkdkdkdkkdkdkdkdkk',this.different)
    this.onSubmit1();
    this.onSubmit2();
    this.onSubmit3();
  //  console.log('updated',this.updated)
    // if(this.form1 == true || this.form2 == true || this.form3 == true)
    // {
    //   console.log('dif5555555555',this.Etudiant1Form.valid,'ghhhhhhhhh',this.facebook1)
    //   if(this.different == true )
    //   {
    //     this.router.navigateByUrl(`/questionnaire3`);
    //     console.log('success 1')

    //   }else{
    //     this.router.navigateByUrl(`/usergroup`);
    //   }

    // }

    if(this.Etudiant1Form.valid == false ) {
      this.serverErrorMessages = "veuillez remplir les informations générales du membre d'équipe 1"
//  console.log('membre1',this.Etudiant1Form.value)

      this.onSubmit1();
    }else{
      if(this.Etudiant2Form.valid == false && this.Ajout1 == true ) {
        this.serverErrorMessages = "veuillez remplir les informations générales du membre d'équipe 2"
        this.onSubmit2();
      }else{
        if(this.Etudiant3Form.valid == false && this.Ajout2 == true) {
          this.serverErrorMessages = "veuillez remplir les informations générales du membre d'équipe 3"
          this.onSubmit3();
        }else{
       //   console.log('testttt different', this.different)
    if(this.different == true){
      console.log("messageeeeee");
     // console.log('diiiffff')
          this.formulaireService.CreateQuest3(this.data.id).subscribe(
      res => {

        /// si les 3 formulaires sont valide on va se naviguer ver le questionnaire 3
        if(this.Etudiant1Form.valid == true && this.facebook1 == true)
        {
           console.log("messageeeeee",res);
this.router.navigateByUrl(`/questionnaire3`);
console.log('form 3 créer',res);
        }else{
          this.router.navigateByUrl(`/usergroup`);
        }
        if(this.Etudiant2Form.valid == true && this.facebook3 == true)
        {
this.router.navigateByUrl(`/questionnaire3`);
console.log('form 3 créer');
        }else{
          this.router.navigateByUrl(`/usergroup`);
        }
        if(this.Etudiant3Form.valid == true && this.facebook3 == true)
        {
this.router.navigateByUrl(`/questionnaire3`);
console.log('form 3 créer');
        }else{
          this.router.navigateByUrl(`/usergroup`);
        }





      }
    )}
        }
      }
    }


  }

  TimeOut(){
    this.serverErrorMessages = false
  }

  selectImage(event : any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName = file.name
      this.images = file;
      }
  }

  selectImage2(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName2 = file.name
      this.images2 = file;
      }
  }

  selectImage3(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName3 = file.name
      this.images3 = file;

      }
  }

  sendImage(image : any, fileName : any,id :any)
  {
    const formData = new FormData();

    formData.append('file', image);
  this.formulaireService.sendFileMembreEquipe(formData, id, fileName).subscribe(
    (res) => {
      console.log(res)

  },

    (err) => console.log(err)
  )
  }

  Situation1(){
    if( (this.Etudiant1Form.value.Situation ) == 1)
    {
      this.diplome1 = true;
      this.etudiant1 = false;
    }else{
      if( (this.Etudiant1Form.value.Situation ) == 0)
      {
        this.etudiant1 = true;
        this.diplome1 = false;
      }
    }
  }

  Situation2(){

    if( ( this.Etudiant2Form.value.Situation ) == 1)
    {
      this.diplome2 = true;
      this.etudiant2 = false;
    }else{
      if( ( this.Etudiant2Form.value.Situation ) == 0)
      {
        this.etudiant2 = true;
        this.diplome2 = false;
      }
    }
  }


  Situation3(){


    if( ( this.Etudiant3Form.value.Situation) == 1)
    {

      this.diplome3 = true;
      this.etudiant3 = false;
    }else{
      if( ( this.Etudiant3Form.value.Situation) == 0)
      {
        this.etudiant3 = true;
        this.diplome3 = false;
      }
    }
  }

  Ajouter(){
    this.nb= this.nb + 1
    if(this.nb == 1)
    {
      this.Ajout1 = true
    }else{
      if(this.nb == 2)
      this.Ajout2 = true
    }
  }

  Test(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {
        let result : any = res
        this.test = result.data[0]
      })
  }











TestSpecialite(){
  //if(this.Etudiant1Form.valid == true)
  //{
   // console.log('****************')
  // if(this.test.Departement == this.Etudiant1Form.value.Departement && this.test.Domaine == this.Etudiant1Form.value.Domaine )
 //  {
  //  console.log('999999999')
   // if(this.Ajout1 == false)
 //   {
   //   console.log('5555555')
      //this.different = false
     // alert("Il faut qu'au minimum deux membre de l'équipe être d'une domaine ou département différents! ")
    //}else{
   //       this.different = true
//       if(this.Etudiant2Form.valid == true )
//       {
//         if(this.test.Departement == this.Etudiant2Form.value.Departement && this.test.Domaine == this.Etudiant2Form.value.Domaine){
// if(this.Ajout2 == false)
//         {
//           console.log('444444444')
//           this.different = false
//          // alert("Il faut qu'au minimum deux membre de l'équipe être d'une domaine ou département différents! ")
//         }else{
//          // this.different = true
//           if(this.Etudiant3Form.valid == true)
//           {
//             if(this.test.Departement == this.Etudiant3Form.value.Departement && this.test.Domaine == this.Etudiant3Form.value.Domaine){
//               console.log('6666666666')
//               this.different = false
//             alert("Il faut qu'au minimum deux membre de l'équipe être d'une domaine ou département différents! ")

//             }else{
//               console.log('777777777777')
//             this.different = true
//               }
//           }
//         }
//         }else{
//           this.different = true
//         }

//       }
//  }
  // }else{
    //console.log('00000000000000')
//    this.different = true
  // }

  //}
//   if(this.Ajout1 == true){
//     if(this.test.Domaine == this.Etudiant2Form.value.Domaine )
//     {
//       console.log('hhhhhhhhhhhhhh')
// this.different = false

// alert('0000000000')
// }
//     else{
//       if(this.Etudiant1Form.value.Domaine == this.Etudiant2Form.value.Domaine)
//       {
//         alert('')
//         console.log('oooooooooooooo')
//         this.different = false
//       }else{
//         console.log('bbbbbbbbbbbbbbbbbbbbb')
//         this.different = true
//       }
//     }
//   } else{
//     this.different = true
//   }

  if(this.Ajout2 == true)
  {


       if(this.test.Departement == this.Etudiant3Form.value.Departement && this.test.Domaine == this.Etudiant3Form.value.Domaine){
          this.different = false
          alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
        }else{
          if(this.Etudiant1Form.value.Departement == this.Etudiant3Form.value.Departement && this.Etudiant1Form.value.Domaine == this.Etudiant3Form.value.Domaine)
          {
            alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
            this.different = false
          }else{
            if(this.Etudiant2Form.value.Departement == this.Etudiant3Form.value.Departement && this.Etudiant2Form.value.Domaine == this.Etudiant3Form.value.Domaine)
            {
              alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
              this.different = false
            }else{
              if(this.test.Domaine == this.Etudiant2Form.value.Domaine )
               {
     // console.log('hhhhhhhhhhhhhh')
          this.different = false

      alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
      }
    else{
      if(this.Etudiant1Form.value.Domaine == this.Etudiant2Form.value.Domaine)
      {
        alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
       // console.log('oooooooooooooo')
        this.different = false
      }else{
      //  console.log('bbbbbbbbbbbbbbbbbbbbb')
        this.different = true
      }
    }
            }
          }
        }


  }else{
    if(this.test.Domaine == this.Etudiant2Form.value.Domaine )
    {
// console.log('hhhhhhhhhhhhhh')
this.different = false

alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
}
else{
if(this.Etudiant1Form.value.Domaine == this.Etudiant2Form.value.Domaine)
{
alert("Les membres de l’équipe doivent appartenir à au moins deux départements différents et/ou deux spécialités différentes.")
// console.log('oooooooooooooo')
this.different = false
}else{
//  console.log('bbbbbbbbbbbbbbbbbbbbb')
this.different = true
}
}
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
