import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../entities/user";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

type EntityResponseType = HttpResponse<User>;
type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) { }

  public addUser(category: User): Observable<EntityResponseType>  {
    return this.http.post<User>(this.USER_URL, category, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getUsers(): Observable<EntityArrayResponseType> {
    return this.http.get<User[]>(this.USER_URL, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getUserById(id: number): Observable<EntityResponseType> {
    return this.http.get<User>(this.USER_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getUserssByName(userName: string): Observable<EntityArrayResponseType>  {
    const params = new HttpParams();
    params.append('name', userName);
    return this.http.get<User[]>(this.USER_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateCategory(user: User): Observable<EntityResponseType>  {
    return this.http.put<User>(this.USER_URL, user, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteCategory(user: User): Observable<EntityResponseType>  {
    return this.http.delete<User>(this.USER_URL, {body: user, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
}
