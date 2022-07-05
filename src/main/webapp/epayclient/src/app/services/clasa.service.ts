import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Product} from "../entities/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Anunt} from "@app/entities/anunt";
import {UserService} from "@app/services/user.service";
import {Solicitare_colaborare} from "@app/entities/solicitare_colaborare";
import {Clasa} from "@app/entities/clasa";


type EntityResponseType = HttpResponse<Clasa>;
type EntityArrayResponseType = HttpResponse<Clasa[]>;

@Injectable({
  providedIn: 'root'
})
export class ClasaService {

  private readonly CLASA_URL = environment.apiUrl + 'clase';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addClasa(clasa: Clasa): Observable<EntityResponseType>  {

    return this.http.post<Clasa>(this.CLASA_URL, clasa, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getProducts(): Observable<HttpResponse<Solicitare_colaborare[]>> {
    return this.http.get<Solicitare_colaborare[]>(environment.apiUrl + 'solicitari_colaborare', { observe: 'response' })
      .pipe(map((res: HttpResponse<Solicitare_colaborare[]>) => res));
  }

  public getClaseByAnuntUserId(userName: string): Observable<EntityArrayResponseType> {
    return this.http.get<Clasa[]>(this.CLASA_URL + '/' + userName, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public deleteSolicitare(solicitare: Solicitare_colaborare): Observable<HttpResponse<Solicitare_colaborare>>  {
    return this.http.delete<Solicitare_colaborare>(environment.apiUrl + 'solicitari_colaborare', {body: solicitare, observe: 'response'})
      .pipe(map((res: HttpResponse<Solicitare_colaborare>) => res));
  }



}
