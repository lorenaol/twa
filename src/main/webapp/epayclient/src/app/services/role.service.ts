import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaderResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Role} from "../entities/role";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Data} from "@angular/router";

type EntityResponseType = HttpResponse<Role>;
type EntityArrayResponseType = HttpResponse<Role[]>;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly ROLE_URL = 'http://localhost:8082/api/roles';

  constructor(private http: HttpClient) { }

  public addRole(role: Role): Observable<EntityResponseType>  {
    return this.http.post<Role>(this.ROLE_URL, role, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getRoles(pageble?: any): Observable<EntityArrayResponseType> {
    console.log(pageble)
    return this.http.get<Role[]>(this.ROLE_URL, {params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getRoleById(id: number): Observable<EntityResponseType> {
    return this.http.get<Role>(this.ROLE_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getRolesByName(roleName: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams();
    params.append('name', roleName);
    return this.http.get<Role[]>(this.ROLE_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getRolesByCode(roleCode: string): Observable<EntityArrayResponseType>  {
      const params = new HttpParams();
      params.append('code', roleCode);
      return this.http.get<Role[]>(this.ROLE_URL, {params, observe: 'response'})
        .pipe(map((res: EntityArrayResponseType) => res));
    }

  public updateRole(role: Role): Observable<EntityResponseType>  {
    return this.http.put<Role>(this.ROLE_URL, role, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteRole(role: Role): Observable<EntityResponseType>  {
    return this.http.delete<Role>(this.ROLE_URL, {body: role, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public sortRoles(column: string, direction :string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('direction', direction);
   // params.set('id', id);
    return this.http.get<Role[]>(this.ROLE_URL + '/sort' + column, {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public filterRoles(id:string, name:string, code:string, startDate?:Data, endDate?:Data, pageble?: any): Observable<EntityArrayResponseType> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, code]);
    //console.log(params.getAll("FILTER-PARAMS"))
    return this.http.get<Role[]>(this.ROLE_URL + '/filter', { headers: params, params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
}
