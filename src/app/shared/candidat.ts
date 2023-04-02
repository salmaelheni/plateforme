
///// type conforme au bd
////ça pour le userprofile , user et user2
export interface Candidat {
  _id : string;
  name: String,
      prenom: String,
      genre: String,
      age: Number,
    nationalite: String,
      Ville : String,
      Phone: Number,
      email: String,
      lienfb: String,
      LienLinkedIn: String,
      Institution: String,
      Domaine: String,
      Departement:String,
      Niveau:String,
      image:String,
      Annee:String,
      candidature: string,
      Activites:String,
      Club:String,
      Projet:String,
      IdeeDeProjet:String,
      Compétences:String,
      RaisonInteret:String,
      ConcoursEntrepreneuriale:String,
      ActiviteEntreprenariale:String,
      RaisonDePartitipation:String,
      FaconEntendu:String,
      CV:String,
      Video:String,
      BesoinCompetences:String,
}




export interface UserInscription {
    _id : string;
    IdChefProjet: String
    name: string
    prenom: string
    nationalite: string
    age: number
    genre: string
    Phone: number
    email: string
    lienfb: string
    LienLinkedIn: string
    Situation: string
    Institution: string
    Domaine: string
    Departement: string
    Niveau: string
    Annee: string
}




//// type pour les questions du questionnaire 3
export interface CandidatQuest3{
  _id :String;
      Activites:String,
      Club:String,
      Projet:String,
      Competences:String,
      CompetencesEquipe:String,
      RaisonInteret:String,
      ConcoursEntrepreneuriale:String,
      ActiviteEntreprenariale:String,
      IdeeDeProjet:String,
      ImportanceCompetencesEquipe :String,
      CompetencesManquent:String,
      RaisonDePartitipation:String,
      FaconEntendu:String,
      CV1:String,
      CV2:String,
      CV3:String,
      CV4:String,
      Video:String,
}
