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
import {Document} from "@app/entities/document";
import {Test} from "@app/entities/test";


type EntityResponseType = HttpResponse<Test>;
type EntityArrayResponseType = HttpResponse<Test[]>;

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private readonly CONTINUT_URL = environment.apiUrl + 'teste';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addTest(test: Test): Observable<EntityResponseType>  {
    return this.http.post<Test>(this.CONTINUT_URL, test, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getTesteByClasaId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Test[]>(this.CONTINUT_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateTest(user: Test): Observable<EntityResponseType> {
    return this.http.put<Test>(this.CONTINUT_URL, user, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }



}
