import { FormulairesService } from '../shared/formulaires.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user3',
  templateUrl: './user3.component.html',
  styleUrls: ['./user3.component.css']
})
export class User3Component implements OnInit {
  candidature : any;

  QuestForm!: UntypedFormGroup;

fileName !: string;
cv : any;

fileName1 !: string;
cv1 : any;

fileName2 !: string;
cv2 : any;

fileName3 !: string;
cv3 : any;

video : any;
tab = Array(1);
currentUser : any;
data : any;

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private router : Router, private formulaireService:FormulairesService) { }

  ngOnInit(): void {
    this.CurrentUser();
    this.getUser();
    this.setInputsVal();
    this.createForm3();
  }

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
  get f() { return this.QuestForm.controls; }

  setInputsVal(){
  console.log("hannnnnnnnnnnnnnnnnnn");
  this.formulaireService.getUser3Quest(this.data.id).subscribe(
    res => {

      this.candidature = res ;

      this.tab = this.candidature.data
        console.log("candidature",this.data.id);
      ///// on parcours le tableau pour qu'on peut lire les différents champs et les affecter au valeurs des inputs
      for(var i in this.tab)
      {

      this.QuestForm = this.fb.group({
        _id: [this.data.id],
        Activites: [JSON.parse(this.tab[i].Activites), Validators.required],
        Club: [JSON.parse(this.tab[i].Club), Validators.required],
        Projet: [this.tab[i].Projet, Validators.required],
        Competences: [this.tab[i].Competences, Validators.required],
        CompetencesEquipe: [this.tab[i].CompetencesEquipe, Validators.required],
        RaisonInteret: [this.tab[i].RaisonInteret, Validators.required],
        ConcoursEntrepreneuriale: [this.tab[i].ConcoursEntrepreneuriale, Validators.required],
        ActiviteEntreprenariale: [this.tab[i].ActiviteEntreprenariale, Validators.required],
        IdeeDeProjet: [this.tab[i].IdeeDeProjet, Validators.required],
        ImportanceCompetencesEquipe: [this.tab[i].ImportanceCompetencesEquipe, Validators.required],
        CompetencesManquent: [this.tab[i].CompetencesManquent, Validators.required],
        Video:['', Validators.required],
        RaisonDePartitipation: [this.tab[i].RaisonDePartitipation, Validators.required],
        FaconEntendu: [this.tab[i].FaconEntendu, Validators.required],
        quest11: ['', Validators.required],
        quest12: ['', Validators.required],
        quest13: ['', Validators.required],
        quest14: ['', Validators.required],
        quest15: ['', Validators.required],


      })

    }

  }

)
}

  createForm3() {

    this.QuestForm = this.fb.group({
      _id: [this.data.id],
      Activites: ['', Validators.required],
      Club: ['', Validators.required],
      Projet: ['', Validators.required],
      Competences: ['', Validators.required],
      CompetencesEquipe: ['', Validators.required],
      RaisonInteret: ['', Validators.required],
      ConcoursEntrepreneuriale: ['', Validators.required],
      ActiviteEntreprenariale: ['', Validators.required],
      IdeeDeProjet: ['', Validators.required],
      ImportanceCompetencesEquipe: ['', Validators.required],
      CompetencesManquent: ['', Validators.required],
      Files : [],
      Video:['', Validators.required],
      RaisonDePartitipation: ['', Validators.required],
      FaconEntendu: ['', Validators.required],
      quest11: ['', Validators.required],
      quest12: ['', Validators.required],
      quest13: ['', Validators.required],
      quest14: ['', Validators.required],
      quest15: ['', Validators.required],
      Reponse : ['en cours']

    })
  }



  onSubmit() {
    this.formulaireService.postUser3Quest(this.QuestForm.value).subscribe(
      res => {
        console.log('form 3 enregistré',res)
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
      this.sendCV(this.cv);
      }
  }

  selectCV1(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName1 = file.name
      this.cv1 = file;
      this.sendCV(this.cv1);
      }
  }

  selectCV2(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName2 = file.name
      this.cv2 = file;
      this.sendCV(this.cv2);
      }
  }

  selectCV3(event : any){

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileName3 = file.name
      this.cv3 = file;
      this.sendCV(this.cv3);
      }
  }

sendCV(cv : any){
  const formData = new FormData();

  formData.append('file', cv);
this.formulaireService.sendGroupFiles(formData, this.data.id).subscribe(
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
