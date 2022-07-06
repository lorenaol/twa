import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Clasa} from "@app/entities/clasa";
import {TestService} from "@app/services/test.service";
import {Test} from "@app/entities/test";
import {CreateClassDialogComponent} from "@app/components/create-class-dialog/create-class-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateTestDialogComponent} from "@app/components/create-test-dialog/create-test-dialog.component";

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {

  nameClass = 'MATE X';
  nameColab = 'Lorena';
  clasa? : Clasa;

  constructor(private router: Router,
              public dialog: MatDialog, private testService: TestService) { }


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
    const dialogRef = this.dialog.open(CreateTestDialogComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let test = new Test();
      test.numeTest = result;
      let today = new Date();
      test.date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      test.stare = "0";
      test.notareTotala = 10;
      test.clasa = JSON.parse(localStorage.getItem("clasa")!);
      this.testService.addTest(test).subscribe(()=> {
            localStorage.setItem('test', JSON.stringify(test));
            this.router.navigate(["/creare-test"]);
      })
      // this.animal = result;
    });
    // let test = new Test();
    // test.numeTest = "ceva";
    // this.testService.addTest(test).subscribe(
    //   ()=> {
    //     localStorage.setItem('test', JSON.stringify(test));
    //     this.router.navigate(["/creare-test"]);
    //   }
    // )

  }
}
