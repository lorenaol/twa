import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
      if (route.data.authorities) {
        for (let i = 0; i < route.data.authorities.length; i++) {
          let code = route.data.authorities[i];
          if (user.authorityCode?.indexOf(code) === -1) {
            return false;
          }
        }
      }
      return true;
    }
    this.authenticationService.showLogin();
    return false;
  }
}
