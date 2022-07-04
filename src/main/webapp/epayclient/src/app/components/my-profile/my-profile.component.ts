import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  selected = 4;
  userName = "Lorena Olescu";
  userEmail = "lorenaolescu@gmail.com";
  userAddress = "Valcea, Cernisoara";
  userRole = "Tutore";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("a intrat");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
