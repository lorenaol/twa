import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Category} from "../entities/category";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {Review} from "@app/entities/review";
import {ShoppingCart} from "@app/entities/shoppingcart";
import {Product} from "@app/entities/product";

type EntityResponseType = HttpResponse<Review>;
type EntityArrayResponseType = HttpResponse<Review[]>;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly REVIEW_URL = environment.apiUrl + 'reviews';
  private productId?: number;
  private review = new Review();
  private static product? : Product;
  images:  Map<number, string[]> = new Map<number, string[]>();
  reviewId? : number;

  constructor(private http: HttpClient) { }

  setImages(images: Map<number, string[]>) : void {
    this.images = images;
  }

  getImages() :  Map<number, string[]> {
    return this.images;
  }

  getReviewId() : number {
    return this.reviewId!;
  }

  setProduct(product: Product) : void{
    ReviewService.product = product;
    sessionStorage.setItem('reviewProduct', JSON.stringify(product));
  }

  getProduct() : Product  {
    return ReviewService.product!;
}

  setReview(review: Review): void {
    this.review = review;
    // this.review.productId = JSON.parse(sessionStorage.getItem('reviewProduct')!).id;
    // if(localStorage.getItem('user')) {
    //   this.review.userName = JSON.parse(localStorage.getItem('user')!).userName;
    // } else {
    //   this.review.userName = 'unknownUser';
    // }
    this.addReview(this.review).subscribe((data:any)=> this.reviewId = data.body.id);
  }

  public addReview(review: Review): Observable<EntityResponseType>{
    return this.http.post<Review>(this.REVIEW_URL, review, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }

  public updateReview(review: Review): Observable<EntityResponseType> {
    return this.http.put<Review>(this.REVIEW_URL, review, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }

  public deleteReview(review: Review): Observable<EntityResponseType> {
    return this.http.delete<Review>(this.REVIEW_URL, {body: review, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  public getReviewsByProductId(id: number) : Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Review[]>(this.REVIEW_URL + "/findByProductId", {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

}
