import {Component} from '@angular/core';
import {User} from "@app/entities/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user!: User | null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}


