import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Candidature : any


  constructor() { }

  ngOnInit(): void {

  }



  candidature(Candidature : any){

    console.log('Candidature',Candidature)
  }

}
