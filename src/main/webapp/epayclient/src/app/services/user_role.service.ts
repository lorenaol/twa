import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {User_role} from "../entities/user_role";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


type EntityResponseType = HttpResponse<User_role>;
type EntityArrayResponseType = HttpResponse<User_role[]>;

@Injectable({
  providedIn: 'root'
})
export class User_roleService {

  private readonly USERROLE_URL = 'http://localhost:8082/api/userroles';

  constructor(private http: HttpClient) { }

  public addUserrole(user_role: User_role): Observable<EntityResponseType>  {
    return this.http.post<User_role>(this.USERROLE_URL, user_role, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getUserrole(): Observable<EntityArrayResponseType> {
    return this.http.get<User_role[]>(this.USERROLE_URL, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getUserroleById(id: number): Observable<EntityResponseType> {
    return this.http.get<User_role>(this.USERROLE_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public updateUserrole(user_role: User_role): Observable<EntityResponseType>  {
    return this.http.put<User_role>(this.USERROLE_URL, user_role, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteUserrole(user_role: User_role): Observable<EntityResponseType>  {
    return this.http.delete<User_role>(this.USERROLE_URL, {body: user_role, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
}
