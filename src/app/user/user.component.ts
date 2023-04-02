import { Candidat } from './../shared/candidat';
import { FormulairesService } from './../shared/formulaires.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  QuestForm!: UntypedFormGroup;

fileName !: string;
cv : any;
video : any;
currentUser : any
data : any
tab = Array(1) ;
candidat !: Candidat;
candidature : any;



  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private router : Router, private formulaireService : FormulairesService) { }

  ngOnInit(): void {
    this.CurrentUser();
    this.getUser();
    this.setInputsVal();
    this.createForm();


  }
  get f() { return this.QuestForm.controls; }

  //tjrs cette methode pour connaitre l id de li'utilisateur connecté
  CurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
      this.logout();
    }
    this.data = jwt_decode(this.currentUser)
    console.log('data',this.data)
  }
  getUser(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {

        let result : any = res;
        if(result.data[0].Reponse == 'envoye'){

          this.router.navigateByUrl(`/validation`);
        }
      })
      }

  createForm() {

    this.QuestForm = this.fb.group({
      _id: [this.data.id],
      Activites: ['', Validators.required],
      Club: ['', Validators.required],
      Projet: ['',Validators.required],
      Competences: ['', Validators.required],
      RaisonInteret: ['',Validators.required],
      ConcoursEntrepreneuriale: ['',Validators.required],
      ActiviteEntreprenariale: ['', Validators.required],
      RaisonDePartitipation: ['', Validators.required],
      FaconEntendu: ['', Validators.required],
      CV:     ['', Validators.required],
      video:  ['', Validators.required],
      quest10: ['', Validators.required],
      Reponse : ['en cours']
    })

  }

  ////// methode pour affecter les valeurs trouver dans la bd saisi par l'utilisateur dans les input de la forme QuestForm
  setInputsVal(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {

        this.candidature = res ;

        this.tab = this.candidature.data

        for(var i in this.tab)
        {

        this.QuestForm = this.fb.group({
          _id: [this.data.id],
          Activites: [JSON.parse(this.tab[i].Activites), Validators.required],
          Club: [JSON.parse(this.tab[i].Club), Validators.required],
          Projet: [this.tab[i].Projet,Validators.required],
          Competences: [this.tab[i].Competences, Validators.required],
          RaisonInteret: [this.tab[i].RaisonInteret,Validators.required],
          ConcoursEntrepreneuriale: [this.tab[i].ConcoursEntrepreneuriale,Validators.required],
          ActiviteEntreprenariale: [this.tab[i].ActiviteEntreprenariale, Validators.required],
          RaisonDePartitipation: [this.tab[i].RaisonDePartitipation, Validators.required],
          FaconEntendu: [this.tab[i].FaconEntendu, Validators.required],
          CV:     ['', Validators.required],
          video:  ['', Validators.required],
          quest10: ['', Validators.required],
        })
      }

      }

    )
  }




  onSubmit() {
this.formulaireService.postUserQuest(this.QuestForm.value).subscribe(
  res => {
    console.log('reponses enregistrés')


  }
)
  }

  Enregistrer(){
    alert("Vos réponses ont été enregistrées avec succès, mais ne sont pas encore envoyées pour évaluation. Veuillez les envoyer si vous n’avez pas de modifications à apporter.")
  }

  validate(){
    console.log('yyyyy')
    if(confirm("En envoyant vos réponses, vous ne pouvez plus les modifier. Etes vous sûr de vouloir envoyer vos réponses ?"))
    {
      this.QuestForm.value.Reponse = 'envoye'
    this.formulaireService.postUserQuest(this.QuestForm.value).subscribe(
      res => {
        console.log('reponses enregistrés')


      })
    this.router.navigateByUrl(`/validation`);
    }


  }


  selectCV(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName = file.name
      this.cv = file;
      this.sendCV(this.fileName);
      }
  }

 sendCV(filename : any)
  {
    const formData = new FormData();

    formData.append('file', this.cv);
  this.formulaireService.sendCV(formData, this.data.id, filename).subscribe(
    (res) => {
      console.log(res)

  },

    (err) => console.log(err)
  )
  }
  selectVideo(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName = file.name
      this.video = file;
      this.sendVideo(this.fileName);
      }
  }



  sendVideo(filename : any)
  {
    const formData = new FormData();

    formData.append('file', this.video);
  this.formulaireService.sendVideo(formData, this.data.id, filename).subscribe(
    (res) => {
      console.log(res)

  },

    (err) => console.log(err)
  )
  }


  logout(){
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('/')
  }



}
