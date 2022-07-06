import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClasaService} from "@app/services/clasa.service";
import {Clasa} from "@app/entities/clasa";

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {

  // classes = [{nume: 'Clasa mate', elev: "Ana"},
  //   {nume: 'Clasa info', elev: "Lorena"},
  //   {nume: 'Clasa fizica', elev: "Andreea"}];
  classes? : Clasa[];

  constructor(private router: Router, private clasaService: ClasaService) { }

  ngOnInit(): void {
    this.clasaService.getClaseByAnuntUserId(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any)=>{
      this.classes = data.body;
    })
  }

  enterInClass(c: Clasa): void {
    localStorage.setItem('clasa', JSON.stringify(c));
    this.router.navigate(["/vezi-clasa"]);
  }

}
