import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";
import {UserService} from "@app/services/user.service";
import {User} from "@app/entities/user";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  selected = 5;
  // userName = "Lorena Olescu";
  // userEmail = "lorenaolescu@gmail.com";
  // userAddress = "Valcea, Cernisoara";
  // userRole = "Tutore";
  user?: User

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    console.log("a intrat");
    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem("user")!).userName).subscribe((data:any) => {
      this.user = data.body;
    })
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
