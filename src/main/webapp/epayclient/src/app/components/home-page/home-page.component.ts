import { Component, OnInit } from '@angular/core';
import { Authorities } from '@app/enums/authorities';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  Authorities = Authorities;
  title = 'Za Best E-Pay';
  materii= ["Limba și literatura română","Matematică","Limbi moderne",
    "Chimie","Fizică","Biologie","Istorie","Geografie","Discipline socio-umane","Programare","Html", "CSS",
    "Javascript","C++","Java","Python","Software","Office","Photoshop", "Figma", "Religie",
    "Educație fizică și sport", "Arte plastice", "Educație muzicală", "Altele"];

  constructor() { }

  ngOnInit(): void {
  }

}



