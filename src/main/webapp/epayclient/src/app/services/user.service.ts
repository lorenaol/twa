import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../entities/user";
import {Observable, throwError} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "@environments/environment";
import {SigninComponent} from "@app/components/signin/signin.component";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ForgotPasswordComponent} from "@app/components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "@app/components/reset-password/reset-password.component";
import {PasswordChangeComponent} from "@app/components/password-change/password-change.component";

type EntityResponseType = HttpResponse<User>;
type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = environment.apiUrl + 'users';
  private forgotDialog: NgbModalRef | null;
  private changeDialog: NgbModalRef | null;
  password: any;
  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.forgotDialog = null;
    this.changeDialog = null;

    // let userName = JSON.parse(localStorage.getItem('user')!).userName;
    // if(userName!=null){
    // this.getUsersByEmail(userName).subscribe((data:HttpResponse<User>)=>{
    //   this.password = data.body?.password;
    //   console.log(this.password);
    // });}
  }

  public addUser(user: User): Observable<EntityResponseType> {
    return this.http.post<User>(this.USER_URL, user, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public getUsers(pageable?: any): Observable<EntityArrayResponseType> {
    return this.http.get<User[]>(this.USER_URL, {params: pageable, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getUserById(id: number): Observable<EntityResponseType> {
    return this.http.get<User>(this.USER_URL + '/' + id, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public getUsersByName(userName: string): Observable<EntityResponseType> {
    const params = new HttpParams().set('name',userName);

    return this.http.get<User>(this.USER_URL + '/findByName', {params, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
  public getUsersByEmail(userName: string): Observable<EntityResponseType> {
    const params = new HttpParams().set('email',userName);

    return this.http.get<User>(this.USER_URL + '/findByEmail', {params, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }


  public getUserByCode(userEmail: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams();
    params.append('email', userEmail);
    return this.http.get<User[]>(this.USER_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public forgotPassword(userEmail: string): Observable<EntityArrayResponseType> {
    return this.http.post<User[]>(this.USER_URL+"/forgot-password"+"/"+userEmail,{}, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getUserByToken(userToken: string): Observable<EntityArrayResponseType> {
    return this.http.get<User[]>(this.USER_URL+"/reset-password"+"/"+userToken, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }



  public updateUser(user: User | null): Observable<EntityResponseType> {
    return this.http.put<User>(this.USER_URL, user, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }


  public deleteUser(user: User): Observable<EntityResponseType> {
    return this.http.delete<User>(this.USER_URL, {body: user, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public filterUsers(id: string, name: string, email: string, pageble?: any): Observable<EntityArrayResponseType> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, email]);
    return this.http.get<User[]>(this.USER_URL + '/filter', {headers: params, params: pageble, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  showFPass() {
    if (!this.forgotDialog || !this.modalService.hasOpenModals) {
      this.forgotDialog = this.modalService.open(ForgotPasswordComponent, {
        beforeDismiss: () => {
          this.forgotDialog = null;
          return true;
        }
        ,size: "xl"});
    }
  }
  showCPass() {
    if (!this.changeDialog || !this.modalService.hasOpenModals) {
      this.forgotDialog = this.modalService.open(PasswordChangeComponent, {
        beforeDismiss: () => {
          this.forgotDialog = null;
          return true;
        }
        ,size: "xl"});
    }
  }

  public resetPassword(userToken: string, userPassword: string): Observable<EntityArrayResponseType> {
    return this.http.put<User[]>(this.USER_URL+"/reset-password"+"/"+userToken+"/"+userPassword,{}, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public resetPasswordLoggedIn(init_password: string, change_password: string, email: string): Observable<EntityArrayResponseType> {
    let userName = JSON.parse(localStorage.getItem('user')!).userName;
    console.log(userName);

    this.getUsersByEmail(userName).subscribe((data:HttpResponse<User>)=>{this.password = data.body?.password;console.log(this.password);});
    console.log(this.password);

    if(init_password==this.password){

      this.getUsersByEmail(email).subscribe((data:HttpResponse<User>)=>{
        let user = data.body;
        // @ts-ignore
        user.password = change_password;
        this.updateUser(user).subscribe()
        })
    }
    console.log("fgretgrtgrt");
    this.getUsersByEmail(userName).subscribe((data:HttpResponse<User>)=>{this.password = data.body?.password;console.log(this.password);});
    console.log(this.password);

    return this.http.put<User[]>(this.USER_URL+"/reset-password-logged-in"+"/"+init_password+"/"+change_password+"/"+email,{}, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

}
