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

  constructor() { }

  ngOnInit(): void {
  }
}



