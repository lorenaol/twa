import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {

  classes = [{nume: 'Clasa mate', elev: "Ana"},
    {nume: 'Clasa info', elev: "Lorena"},
    {nume: 'Clasa fizica', elev: "Andreea"}];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  enterInClass(): void {
    this.router.navigate(["/vezi-clasa"]);
  }

}
