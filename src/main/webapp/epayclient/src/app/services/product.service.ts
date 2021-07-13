import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Product} from "../entities/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

type EntityResponseType = HttpResponse<Product>;
type EntityArrayResponseType = HttpResponse<Product[]>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCT_URL = 'http://localhost:8082/api/products';


  constructor(private http: HttpClient) { }

  public addProduct(product: Product): Observable<EntityResponseType>  {
    return this.http.post<Product>(this.PRODUCT_URL, product, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getProducts(): Observable<EntityArrayResponseType> {
    return this.http.get<Product[]>(this.PRODUCT_URL, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getProductById(id: number): Observable<EntityResponseType> {
    return this.http.get<Product>(this.PRODUCT_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getProductsByName(productName: string): Observable<EntityArrayResponseType>  {
    const params = new HttpParams();
    params.append('name', productName);
    return this.http.get<Product[]>(this.PRODUCT_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateProduct(product: Product): Observable<EntityResponseType>  {
    return this.http.put<Product>(this.PRODUCT_URL, product, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteProduct(product: Product): Observable<EntityResponseType>  {
    return this.http.delete<Product>(this.PRODUCT_URL, {body: product, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }


}
