import { Component, OnInit } from '@angular/core';
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassDialogComponent} from "@app/components/create-class-dialog/create-class-dialog.component";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  info = [{colaborator: "Ana", anunt: "Mate clasa a X-a"},
    {colaborator: "Lorena", anunt: "Info clasa a IX-a"},
    {colaborator: "Andreea", anunt: "Fizica clasa a X-a"}];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  acceptRequest() {
    const dialogRef = this.dialog.open(CreateClassDialogComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  cancelRequest() {

  }

}
