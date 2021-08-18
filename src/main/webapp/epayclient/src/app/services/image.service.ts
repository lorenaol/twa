import { Injectable } from '@angular/core';
import {HttpClient,  HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Image} from "@app/entities/image";

type EntityResponseType = HttpResponse<Image>;
type EntityArrayResponseType = HttpResponse<Image[]>;
@Injectable({
  providedIn: 'root'
})
export class ImageService{

  private readonly IMAGE_URL = environment.apiUrl + 'images';
  constructor(private http: HttpClient) { }


  public deleteImage(image: Image): Observable<EntityResponseType>  {
    return this.http.delete<Image>(this.IMAGE_URL, {body: image, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }
}
