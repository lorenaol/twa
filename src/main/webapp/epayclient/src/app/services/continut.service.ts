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
import {Continut} from "@app/entities/continut";


type EntityResponseType = HttpResponse<Continut>;
type EntityArrayResponseType = HttpResponse<Continut[]>;

@Injectable({
  providedIn: 'root'
})
export class ContinutService {

  private readonly CONTINUT_URL = environment.apiUrl + 'continut';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addContinut(continut: Continut): Observable<EntityResponseType>  {
    return this.http.post<Continut>(this.CONTINUT_URL, continut, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getContinutByTestId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Continut[]>(this.CONTINUT_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getClaseByAnuntUserId(userName: string): Observable<EntityArrayResponseType> {
    return this.http.get<Clasa[]>(this.CONTINUT_URL + '/' + userName, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public deleteSolicitare(solicitare: Solicitare_colaborare): Observable<HttpResponse<Solicitare_colaborare>>  {
    return this.http.delete<Solicitare_colaborare>(environment.apiUrl + 'solicitari_colaborare', {body: solicitare, observe: 'response'})
      .pipe(map((res: HttpResponse<Solicitare_colaborare>) => res));
  }



}
