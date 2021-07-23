import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Roleauthority} from "../entities/roleauthority";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";

type EntityResponseType = HttpResponse<Roleauthority>;
type EntityArrayResponseType = HttpResponse<Roleauthority[]>;

@Injectable({
  providedIn: 'root'
})
export class RoleauthorityService {

  private readonly ROLEAUTHORITY_URL = environment.apiUrl + 'rolesauthorities';

  constructor(private http: HttpClient) { }

  public addRoleAuthority(roleauthority: Roleauthority): Observable<EntityResponseType>  {
    return this.http.post<Roleauthority>(this.ROLEAUTHORITY_URL, roleauthority, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getRoleAuthorities(): Observable<EntityArrayResponseType> {
    return this.http.get<Roleauthority[]>(this.ROLEAUTHORITY_URL, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getRoleAuthorityById(id: number): Observable<EntityResponseType> {
    return this.http.get<Roleauthority>(this.ROLEAUTHORITY_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public updateRoleAuthority(roleauthority: Roleauthority): Observable<EntityResponseType>  {
    return this.http.put<Roleauthority>(this.ROLEAUTHORITY_URL, roleauthority, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteRoleAuthority(roleauthority: Roleauthority): Observable<EntityResponseType>  {
    console.log(roleauthority);
    return this.http.delete<Roleauthority>(this.ROLEAUTHORITY_URL, {body: roleauthority, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
}
