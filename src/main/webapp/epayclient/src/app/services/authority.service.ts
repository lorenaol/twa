import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Authority} from "../entities/authority";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Role} from "../entities/role";


type EntityResponseType = HttpResponse<Authority>;
type EntityArrayResponseType = HttpResponse<Authority[]>;

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private readonly AUTHORITY_URL = environment.apiUrl + 'authorities';

  constructor(private http: HttpClient) { }

  public getAuthorities(pageble?: any): Observable<EntityArrayResponseType> {
    return this.http.get<Authority[]>(this.AUTHORITY_URL, {params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public addAuthority(authority: Authority): Observable<EntityResponseType>  {
    return this.http.post<Authority>(this.AUTHORITY_URL, authority, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }
  public getAuthorityById(id: number): Observable<EntityResponseType> {
    return this.http.get<Authority>(this.AUTHORITY_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }
  public getAuthoritiesByName(name: string): Observable<EntityArrayResponseType>  {
    const params = new HttpParams();
    params.append('name', name);
    return this.http.get<Authority[]>(this.AUTHORITY_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public getAuthoritiesByCode(code: string): Observable<EntityArrayResponseType>  {
    const params = new HttpParams();
    params.append('code', code);
    return this.http.get<Authority[]>(this.AUTHORITY_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateAuthority(authority: Authority): Observable<EntityResponseType>  {
    return this.http.put<Authority>(this.AUTHORITY_URL, authority, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteAuthority(authority: Authority): Observable<EntityResponseType>  {
    return this.http.delete<Authority>(this.AUTHORITY_URL, {body: authority, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public sortAuthorities(column: string, direction :string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('direction', direction);
    return this.http.get<Role[]>(this.AUTHORITY_URL + '/sort' + column, {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public filterAuthorities(id:string, name:string, code:string, pageble?: any): Observable<EntityArrayResponseType> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, code]);
    return this.http.get<Authority[]>(this.AUTHORITY_URL + '/filter', { headers: params, params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

}


