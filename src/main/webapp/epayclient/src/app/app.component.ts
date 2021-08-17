import {Component} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {Authorities} from "@app/enums/authorities";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {UserService} from "@app/services/user.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Authorities = Authorities;
  faUser = faUser;
  user!: UserWithAuthoritiesDto | null;
  private password: string | undefined;


  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {

    this.authenticationService.logout();
  }


  login() {
      this.authenticationService.showLogin();

  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');

    if (user) {

      return true;
    }
    return false;
  }

  signin() {
    this.authenticationService.showSignin();
  }

  changepass() {

    this.userService.showCPass();
  }
}


