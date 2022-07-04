import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userName = "Lorena Olescu";
  userEmail = "lorenaolescu@gmail.com";
  userAddress = "Valcea, Cernisoara";

  constructor() { }

  ngOnInit(): void {
  }

}
