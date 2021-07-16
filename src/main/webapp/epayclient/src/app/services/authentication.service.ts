import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {User} from "../entities/user";
import {environment} from "@environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let user = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(user ? user : '{}'));
    this.user = this.userSubject.asObservable();
  }


  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
   let auth = window.btoa(username + ':' + password);
    return this.http.get<any>(`${environment.apiUrl}login`,{
      headers:{
        Authorization: `Basic ${auth}`
      }
      })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = auth;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
