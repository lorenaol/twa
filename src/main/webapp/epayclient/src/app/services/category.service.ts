import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Category} from "../entities/category";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

type EntityResponseType = HttpResponse<Category>;
type EntityArrayResponseType = HttpResponse<Category[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CATEGORY_URL = 'http://localhost:8082/api/categories';

  constructor(private http: HttpClient) { }

  public addCategory(category: Category): Observable<EntityResponseType>  {
    return this.http.post<Category>(this.CATEGORY_URL, category, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  public getCategories(): Observable<EntityArrayResponseType> {
    return this.http.get<Category[]>(this.CATEGORY_URL, { observe: 'response' })
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
}
