import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TestService} from "@app/services/test.service";
import {Test} from "@app/entities/test";

@Component({
  selector: 'app-tests-class',
  templateUrl: './tests-class.component.html',
  styleUrls: ['./tests-class.component.css']
})
export class TestsClassComponent implements OnInit {

  tests? :Test[];

  constructor(private router: Router, private testService : TestService) { }

  ngOnInit(): void {
    this.testService.getTesteByClasaId(JSON.parse(localStorage.getItem('clasa')!).id).subscribe((data:any)=> {
      this.tests = data.body;
    })
  }

  enterInTest(t:Test): void {
    localStorage.setItem('test', JSON.stringify(t));
    if(t.stare === "0") {
      this.router.navigate(["/raspuns-test"]);
    } else if(t.stare === "1") {
      this.router.navigate(["/noteaza-test"]);
    } else if(t.stare === "2" ) {
      this.router.navigate(["/vezi-test-notat"]);
    }

  }

  colorTest(test: Test): any {
    if(test.stare === "0") {
      return 0;
    }
    if (test.stare === "1") {
      return 1;
    }
    if (test.stare === "2") {
      return 2;
    }
  }

}
