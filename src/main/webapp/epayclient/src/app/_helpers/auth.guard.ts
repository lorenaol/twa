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
      // logged in so return true
      // return true;
      // check if route is restricted by authorities
      console.log(user.authorityCode);
      console.log(route.data.authorities);
      if (route.data.authorities) {
        // role not authorised so redirect to home page
        for (let i = 0; i < route.data.authorities.length; i++) {
          let code = route.data.authorities[i];
          if (user.authorityCode?.indexOf(code) === -1) {
            return false;
          }
        }
        // this.router.navigate(['/login']);
        // return false;
      }
      return true;
    }
    // not logged in so redirect to login page with the return url
 //   this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    this.authenticationService.showLogin();
    return false;
  }
}
