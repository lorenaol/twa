import { Component, OnInit } from '@angular/core';
import {User} from "@app/entities/user";
import {UserService} from "@app/services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // userName = "Lorena Olescu";
  // userEmail = "lorenaolescu@gmail.com";
  // userAddress = "Valcea, Cernisoara";
  user? :User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem("user")!).userName).subscribe((data:any) => {
      this.user = data.body;
    })
  }
  save() {
    // this.user?.name = ng
  }

}
