import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidat, UserInscription, CandidatQuest3 } from './candidat';

@Injectable({
  providedIn: 'root'
})
export class FormulairesService {





  constructor(private http:HttpClient) { }



  sendFile(data : any, id : any, image : any){
    return this.http.post(`http://localhost:3000/File/fileUser/${id}/${image}` ,data)
  }


  sendFileMembreEquipe(data : any, id : any, image : any){
    return this.http.post(`http://localhost:3000/File/fileMembreEquipe/${id}/${image}` ,data)
  }

  sendCV(data : any, id : any, CV : any){
    return this.http.post(`http://localhost:3000/File/fileQuestCV/${id}/${CV}` ,data)
  }
  sendVideo(data : any, id : any, Video : any){
    return this.http.post(`http://localhost:3000/File/fileQuestVideo/${id}/${Video}` ,data)
  }

  sendVideoGroup(data : any, id : any, Video : any){
    return this.http.post(`http://localhost:3000/File/fileQuest3Video/${id}/${Video}` ,data)
  }
  sendGroupFiles(data : any, id : any){
    return this.http.post(`http://localhost:3000/File/fileQuest3/${id}` ,data)
  }

   ///////// pour enregistrer les informations générales du 1ere form
   postUserProfile(user : UserInscription ){
     console.log('user',user,  'user id', user._id)
       return  this.http.post('http://localhost:3000/api/forms/add', user)
    }

    UpdateUserProfile(User : any){

      return  this.http.post(`http://localhost:3000/api/forms/updateInformationGenerale/${User._id}`, User)

    }

    ////// pour enregistrer les reponses du questionnaire 1 dans la meme ligne (avec l'Id) où on a enregistrer les informations
    //générales

    postUserQuest(questionnaire : Candidat){

      return  this.http.post(`http://localhost:3000/api/forms/updateForm/${questionnaire._id}`, questionnaire)

    }

    /// on va créer une ligne pour le questionnaire 3 dans la bd où l'Id de cette ligne est le meme du current user pour qu'on puisse les recupérer ultérierement
    CreateQuest3(id : any){
      return  this.http.post(`http://localhost:3000/api/forms3/add/${id}`,id);

    }

    // on va enregistrer les réponses du questionnaire 3 dans la ligne créer précedement dans la bd à l'aide de l'Id du current user
    postUser3Quest(questionnaire : CandidatQuest3){
      return  this.http.post(`http://localhost:3000/api/forms3/updateForm/${questionnaire._id}`, questionnaire)

    }

    //// pour récupére les reponses (soit du questionnaire 1 ou 2) de l'utilisateur selon son Id
    getUserQuest(id : any){
      return  this.http.get(`http://localhost:3000/api/forms/search/${id}`)
    }

    /// pour récupére les reponsesdu questionnaire 3 de l'utilisateur selon son Id
    getUser3Quest(id : any){
      return  this.http.get(`http://localhost:3000/api/forms3/search/${id}`)
    }

    // pour enregistrer les informations générales des membres d'équipe
    PostMembre(Membre : UserInscription){

      return  this.http.post(`http://localhost:3000/api/equipe/add`, Membre)
    }

    /// pour récupérer les inf générale des membre d'équipe associé au chef projet dont on a passer comme parametre son ID
    getMembre(IdChefProjet : any){
      return this.http.get(`http://localhost:3000/api/equipe/Find/${IdChefProjet}`)
    }

    FindMembre(id : any){
      return this.http.get(`http://localhost:3000/api/equipe/search/${id}`)
    }

    UpdateMembre(id : any, form : any){
      console.log('updateee',id,'form',form)
      return this.http.post(`http://localhost:3000/api/equipe/updateMembre/${id}`, form)
    }

    getFile(filename :any){
      return this.http.get(`http://localhost:3000/images/${filename}`)
    }
}
