import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Category} from "../entities/category";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";

type EntityResponseType = HttpResponse<Category>;
type EntityArrayResponseType = HttpResponse<Category[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CATEGORY_URL = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) { }

  public addCategory(category: Category): Observable<EntityResponseType>  {
    return this.http.post<Category>(this.CATEGORY_URL, category, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getCategories(pageble?: any): Observable<EntityArrayResponseType> {
    return this.http.get<Category[]>(this.CATEGORY_URL, {params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getCategoryById(id: number): Observable<EntityResponseType> {
    return this.http.get<Category>(this.CATEGORY_URL + '/' + id, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getCategoriesByName(categoryName: string): Observable<EntityArrayResponseType>  {
    const params = new HttpParams();
    params.append('name', categoryName);
    return this.http.get<Category[]>(this.CATEGORY_URL, {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public updateCategory(category: Category): Observable<EntityResponseType>  {
    return this.http.put<Category>(this.CATEGORY_URL, category, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public deleteCategory(category: Category): Observable<EntityResponseType>  {
    return this.http.delete<Category>(this.CATEGORY_URL, {body: category, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public sortCategories(column: string, direction :string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('direction', direction);
    return this.http.get<Category[]>(this.CATEGORY_URL + '/sort' + column, {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public filterCategories(id:string, categoryName:string, categoryCode:string, pageble?: any): Observable<EntityArrayResponseType> {
    const params = new HttpHeaders().set('FILTER-PARAMS', [id, categoryName, categoryCode]);
    return this.http.get<Category[]>(this.CATEGORY_URL + '/filter', { headers: params, params:pageble, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
}
