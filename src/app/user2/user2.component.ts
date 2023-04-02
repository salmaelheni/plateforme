import { FormulairesService } from './../shared/formulaires.service';
import { Candidat } from './../shared/candidat';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  candidature : any;
  tab = Array(1);

  QuestForm!: UntypedFormGroup;

   fileName !: string;
   cv : any;
   video : any;

  data :any
  currentUser : any;

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private router : Router, private formulaireService : FormulairesService) { }

  ngOnInit(): void {
    this.CurrentUser();
    this.getUser();
    this.setInputsVal();
    this.createForm2();
  }

  get f() { return this.QuestForm.controls; }

  CurrentUser(){
    this.currentUser = localStorage.getItem('currentUser');
    if(this.currentUser == null){
      this.logout();
    }
    this.data = jwt_decode(this.currentUser)
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

  ////// methode pour affecter les valeurs trouver dans la bd saisi par l'utilisateur dans les input de la forme QuestForm
  setInputsVal(){
    this.formulaireService.getUserQuest(this.data.id).subscribe(
      res => {
        this.candidature = res ;

        this.tab = this.candidature.data

        for(var i in this.tab)
        {
          ///// on parcours le tableau pour qu'on peut lire les différents champs et les affecter au valeurs des inputs

        this.QuestForm = this.fb.group({
          _id: [this.data.id],
          Activites: [JSON.parse(this.tab[i].Activites), Validators.required],
          Club: [JSON.parse(this.tab[i].Club) , Validators.required],
          Projet: [this.tab[i].Projet,Validators.required],
          Competences: [this.tab[i].Competences, Validators.required],
          RaisonInteret: [this.tab[i].RaisonInteret,Validators.required],
          ConcoursEntrepreneuriale: [this.tab[i].ConcoursEntrepreneuriale,Validators.required],
          ActiviteEntreprenariale: [this.tab[i].ActiviteEntreprenariale, Validators.required],
          IdeeDeProjet: [this.tab[i].IdeeDeProjet, Validators.required],
          BesoinCompetences: [this.tab[i].BesoinCompetences, Validators.required],
          CV: ['', Validators.required],
          Video:['', Validators.required],
          RaisonDePartitipation: [this.tab[i].RaisonDePartitipation, Validators.required],
          FaconEntendu: [this.tab[i].FaconEntendu, Validators.required],
          q12: ['', Validators.required],
          q13: ['', Validators.required],
          q14: ['', Validators.required],
          q15: ['', Validators.required],
          q16: ['', Validators.required],

        })
      }

      }

    )
  }

  createForm2() {



    this.QuestForm = this.fb.group({
      _id: [this.data.id],
      Activites: ['', Validators.required],
      Club: ['', Validators.required],
      Projet: ['',Validators.required],
      Competences: ['', Validators.required],
      RaisonInteret: ['',Validators.required],
      ConcoursEntrepreneuriale: ['',Validators.required],
      ActiviteEntreprenariale: ['', Validators.required],
      IdeeDeProjet: ['', Validators.required],
      BesoinCompetences: ['', Validators.required],
      CV: ['', Validators.required],
      Video:['', Validators.required],
      RaisonDePartitipation: ['', Validators.required],
      FaconEntendu: ['', Validators.required],
      q12: ['', Validators.required],
      q13: ['', Validators.required],
      q14: ['', Validators.required],
      q15: ['', Validators.required],
      q16: ['', Validators.required],
      Reponse : ['en cours']
    })
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
      console.log('file',this.cv)
      this.sendCV();
      }
  }

  sendCV()
  {
    const formData = new FormData();

    formData.append('file', this.cv);
  this.formulaireService.sendCV(formData, this.data.id, this.fileName).subscribe(
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
      console.log('vidéo',this.video)
      this.sendVideo();
      }
  }
  sendVideo()
  {
    const formData = new FormData();

    formData.append('file', this.video);
  this.formulaireService.sendVideo(formData, this.data.id, this.fileName).subscribe(
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
