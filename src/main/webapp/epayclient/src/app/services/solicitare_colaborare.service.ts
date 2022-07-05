import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Product} from "../entities/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Anunt} from "@app/entities/anunt";
import {UserService} from "@app/services/user.service";
import {Solicitare_colaborare} from "@app/entities/solicitare_colaborare";


type EntityResponseType = HttpResponse<Product>;
type EntityArrayResponseType = HttpResponse<Product[]>;

@Injectable({
  providedIn: 'root'
})
export class Solicitare_colaborareService {

  private readonly PRODUCT_URL = environment.apiUrl + 'products';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addSolicitare(product: Solicitare_colaborare): Observable<HttpResponse<Solicitare_colaborare>>  {
    console.log(product);

    return this.http.post<Solicitare_colaborare>(environment.apiUrl + 'solicitari_colaborare', product, { observe: 'response' })
      .pipe(map((res: HttpResponse<Solicitare_colaborare>) => res));
  }

  public getProducts(): Observable<HttpResponse<Solicitare_colaborare[]>> {
    return this.http.get<Solicitare_colaborare[]>(environment.apiUrl + 'solicitari_colaborare', { observe: 'response' })
      .pipe(map((res: HttpResponse<Solicitare_colaborare[]>) => res));
  }

  public getSolicitariByAnuntUserId(userName: string): Observable<HttpResponse<Solicitare_colaborare[]>> {
    return this.http.get<Solicitare_colaborare[]>(environment.apiUrl + 'solicitari_colaborare' + '/' + userName, { observe: 'response' })
      .pipe(map((res: HttpResponse<Solicitare_colaborare[]>) => res));
  }

  public deleteSolicitare(solicitare: Solicitare_colaborare): Observable<HttpResponse<Solicitare_colaborare>>  {
    return this.http.delete<Solicitare_colaborare>(environment.apiUrl + 'solicitari_colaborare', {body: solicitare, observe: 'response'})
      .pipe(map((res: HttpResponse<Solicitare_colaborare>) => res));
  }



}
