import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {

  nameClass = 'MATE X';
  nameColab = 'Lorena';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  materials(): void {
    this.router.navigate(["/materiale-clasa"]);
  }

  tests(): void {
    this.router.navigate(["/teste-clasa"]);
  }

}
