import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {User, UserWithAuthoritiesDto} from "../entities/user";
import {environment} from "@environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "@app/components/login/login.component";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<UserWithAuthoritiesDto | null>;
  public user: Observable<UserWithAuthoritiesDto | null>;
  private loginDialog: NgbModalRef | null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    let user = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<UserWithAuthoritiesDto | null>(JSON.parse(user ? user : '{}'));
    this.user = this.userSubject.asObservable();
    this.loginDialog = null;
  }


  public get userValue(): UserWithAuthoritiesDto | null {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    let auth = window.btoa(username + ':' + password);
    return this.http.get<any>(`${environment.apiUrl}login`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = auth;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.loginDialog?.close();
        this.loginDialog = null;
        return user;
      }));
  }


  logout() {
    const verifyUser = this.userValue;

    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    // this.router.navigate(['/login']);
    // if (verifyUser !== null) {
    //  // window.location.reload();
    // }
    //this.showLogin();
    this.router.navigate(['/']);
    // const currentNvg = this.router.getCurrentNavigation();
    //   this.router.navigate([currentNvg]);
  }

  public showLogin() {
    console.log(this.loginDialog);
    if (!this.loginDialog || !this.modalService.hasOpenModals) {
      // this.loginDialog = this.modalService.open(LoginComponent, {backdrop: 'static',beforeDismiss: () =>{return false;
      // }});
      this.loginDialog = this.modalService.open(LoginComponent, {
        beforeDismiss: () => {
          console.log('se apeleaza functia beforeDismiss');
          this.loginDialog = null;
          return true;
        }
      });
    }
  }


  public hasPermissions(hasAuthority: string | string[] | undefined) {
    if (this.userValue) {
      for (let i = 0; i < hasAuthority!.length; i++) {
        let code = hasAuthority![i];
        if (this.userValue.authorityCode?.indexOf(code) === -1) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
