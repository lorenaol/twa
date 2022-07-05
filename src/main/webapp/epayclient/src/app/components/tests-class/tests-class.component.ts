import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tests-class',
  templateUrl: './tests-class.component.html',
  styleUrls: ['./tests-class.component.css']
})
export class TestsClassComponent implements OnInit {

  tests = [{nume: 'Test mate'},
    {nume: 'Test info'},
    {nume: 'Test fizica'}];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  enterInTest(): void {
    this.router.navigate(["/vezi-test"]);
  }

}
