import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {UserWithAuthoritiesDto} from "../entities/user";
import {environment} from "@environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "@app/components/login/login.component";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import {Shopping_cartService} from "@app/services/shopping_cart.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<UserWithAuthoritiesDto | null>;
  public user: Observable<UserWithAuthoritiesDto | null>;
  private loginDialog: NgbModalRef | null;

  constructor(
    private shopping_cartService : Shopping_cartService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    let user = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<UserWithAuthoritiesDto | null>(user ? JSON.parse(user) : null);
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
        this.shopping_cartService.updateCart();
        this.shopping_cartService.selectOldProducts();
        this.userSubject.next(user);
        this.loginDialog?.close();
        this.loginDialog = null;
        return user;
      }));

  }


  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  public showLogin() {
    if (!this.loginDialog || !this.modalService.hasOpenModals) {
      this.loginDialog = this.modalService.open(LoginComponent, {
        beforeDismiss: () => {
          this.loginDialog = null;
          return true;
        }
      });
    }
  }

  public hasAuthority(authority: string): Observable<boolean> {
    const userHasAuth = map((user: UserWithAuthoritiesDto | null): boolean => {
      if (!user) {
        return false;
      }
      return user?.authorityCode?.indexOf(authority) !== -1;
    })
    return userHasAuth(this.user);
  }
}
