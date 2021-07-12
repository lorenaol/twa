import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Category} from "../entities/category";
import {Authority} from "../entities/authority";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


type EntityResponseType = HttpResponse<Authority>;
type EntityArrayResponseType = HttpResponse<Authority[]>;

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private readonly AUTHORITY_URL = 'http://localhost:8082/api/authorities';

  constructor(private http: HttpClient) { }


  public getAuthorities(): Observable<EntityArrayResponseType> {
    return this.http.get<Authority[]>(this.AUTHORITY_URL, { observe: 'response' })
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

  public updateAuthority(authority: Authority): Observable<EntityResponseType>  {
    return this.http.put<Authority>(this.AUTHORITY_URL, authority, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteAuthority(authority: Authority): Observable<EntityResponseType>  {
    return this.http.delete<Authority>(this.AUTHORITY_URL, {body: authority, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

}


