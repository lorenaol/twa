import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Product} from "../entities/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Anunt} from "@app/entities/anunt";
import {UserService} from "@app/services/user.service";


type EntityResponseType = HttpResponse<Product>;
type EntityArrayResponseType = HttpResponse<Product[]>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCT_URL = environment.apiUrl + 'products';

  constructor(private http: HttpClient, private userService: UserService) { }

  public addProduct(product: Anunt): Observable<HttpResponse<Anunt>>  {
    console.log(product);

    return this.http.post<Anunt>(environment.apiUrl + 'anunturi', product, { observe: 'response' })
      .pipe(map((res: HttpResponse<Anunt>) => res));
  }

  public getProducts(): Observable<HttpResponse<Anunt[]>> {
    return this.http.get<Anunt[]>(environment.apiUrl + 'anunturi', { observe: 'response' })
      .pipe(map((res: HttpResponse<Anunt[]>) => res));
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

  public sortProducts(column: string, direction :string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('direction', direction);
    return this.http.get<Product[]>(this.PRODUCT_URL + '/sort' + column, {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public filterProducts(id:string, name:string, code:string, sku:string, pageble?: any): Observable<EntityArrayResponseType> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, code, sku]);
    return this.http.get<Product[]>(this.PRODUCT_URL + '/filter', { headers: params, params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public exportToExcel(id:string, name:string, code:string, sku:string, pageble?: any): Observable<HttpResponse<Blob>> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, code, sku]);
    return this.http.get(this.PRODUCT_URL + '/export/excel', { headers: params, params:pageble, observe: 'response',responseType:'blob' });
  }

  public exportToPdf(id:string, name:string, code:string, sku:string, pageble?: any): Observable<HttpResponse<Blob>> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, name, code, sku]);
    return this.http.get(this.PRODUCT_URL + '/export/pdf', { headers: params, params:pageble, observe: 'response',responseType:'blob' });
  }

}
