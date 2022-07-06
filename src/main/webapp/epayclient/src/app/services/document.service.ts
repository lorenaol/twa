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


type EntityResponseType = HttpResponse<Document>;
type EntityArrayResponseType = HttpResponse<Document[]>;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly CONTINUT_URL = environment.apiUrl + 'documente';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addDocument(document: Document): Observable<EntityResponseType>  {
    return this.http.post<Document>(this.CONTINUT_URL, document, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getDocumentByClasaId(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Document[]>(this.CONTINUT_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }



}
