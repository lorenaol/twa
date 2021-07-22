import {Component, OnInit} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // display;


  user!: UserWithAuthoritiesDto | null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private primengConfig: PrimeNGConfig
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }

  // ngOnInit(): void {
  //   console.log(this.authenticationService.userValue);
  //   if (!this.authenticationService.userValue) {
  //     this.authenticationService.showLogin();
  //   }
  // }




login(){
    this.authenticationService.showLogin();
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }
}


