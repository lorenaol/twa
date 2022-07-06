import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Clasa} from "@app/entities/clasa";
import {TestService} from "@app/services/test.service";
import {Test} from "@app/entities/test";

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {

  nameClass = 'MATE X';
  nameColab = 'Lorena';
  clasa? : Clasa;

  constructor(private router: Router, private testService: TestService) { }

  ngOnInit(): void {
    this.clasa = JSON.parse(localStorage.getItem('clasa')!);
  }

  materials(): void {
    this.router.navigate(["/materiale-clasa"]);
  }

  tests(): void {
    this.router.navigate(["/teste-clasa"]);
  }

  createTest(): void {
    let test = new Test();
    test.numeTest = "ceva";
    this.testService.addTest(test).subscribe(
      ()=> {
        localStorage.setItem('test', JSON.stringify(test));
        this.router.navigate(["/creare-test"]);
      }
    )

  }
}
