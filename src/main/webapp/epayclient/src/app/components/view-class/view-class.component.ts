import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
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

  constructor(private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
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
      // this.animal = result;
    });
  }
}
