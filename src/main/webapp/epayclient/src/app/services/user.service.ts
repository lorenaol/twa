import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../entities/user";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";

type EntityResponseType = HttpResponse<User>;
type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
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

  public getUsersByName(userName: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams();
    params.append('name', userName);
    return this.http.get<User[]>(this.USER_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateUser(user: User): Observable<EntityResponseType> {
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
}
