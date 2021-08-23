import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ShoppingCart} from "@app/entities/shoppingcart";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {Product} from "@app/entities/product";

type EntityResponseType = HttpResponse<ShoppingCart>;
type EntityArrayResponseType = HttpResponse<ShoppingCart[]>;

@Injectable({
  providedIn: 'root'
})
export class Shopping_cartService {

  private readonly SHOPPING_CART_URL = environment.apiUrl + 'shoppingcart';
  inputProduct?: Product
  shoppingCart = new ShoppingCart();
  shoppingCarts? : ShoppingCart[] | null = [];
  found?:boolean;

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  products: Product[] = [];


  init(product: any): void {
    this.inputProduct = product;
    this.setUserId();
  }

  updateCart(): void {
    if(localStorage.getItem('user')) {
      if(localStorage.getItem('userId')) {
        this.getShoppingCartsByUserId(JSON.parse(localStorage.getItem('userId')!)).subscribe((data: any) => {
          if (data.body.length) {
            for (let s of data.body) {
              this.getShoppingCartsByUserEmail(JSON.parse(localStorage.getItem('user')!).userName)
                .subscribe((data2: any) => {
                  if (data2.body.length) {
                    this.found = false;
                    for (let s2 of data2.body) {
                      if (s.product.id == s2.product.id) {
                        this.found = true;
                        s2.quantity += s.quantity;
                        this.updateShoppingCart(s2).subscribe();
                        this.deleteShoppingCart(s).subscribe();
                      }
                    }
                    if (!this.found) {
                      s.userId = data2.body[0].userId;
                      this.updateShoppingCart(s).subscribe();
                    }
                  } else {
                    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem('user')!).userName)
                      .subscribe((data2: any) => {
                        s.userId = data2.body.id;
                        this.updateShoppingCart(s).subscribe();
                      })
                  }

                })
            }
          }
        })
      }
    }
  }

  selectOldProducts(): void {
    this.shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts')!);
    this.getShoppingCartsByUserEmail(JSON.parse(localStorage.getItem('user')!).userName)
      .subscribe((data:any)=>{
        if (data.body.length) {
          if (this.shoppingCarts?.length) {
            for(let d of data.body){
              this.found = false;
              for(let s of this.shoppingCarts!) {
                if(s.product?.id == d.product.id) {
                  this.found = true;
                  s.quantity += d.quantity;
                }
              }
              if(!this.found) {
                this.shoppingCarts.push(d);
              }
            }
            localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
          } else{
            localStorage.setItem('shoppingCarts', JSON.stringify(data.body));
          }


        }
      })


  }


  localStorageProducts() {
    this.shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts')!);
    this.shoppingCart.product = this.inputProduct;
    this.found = false;
    if (this.shoppingCarts) {
      for (let shoppingCart of this.shoppingCarts!) {
        if (shoppingCart.product?.id == this.inputProduct?.id) {
          this.found = true;
          shoppingCart.quantity! += 1;
          this.shoppingCart.quantity = shoppingCart.quantity;
        }
      }
    }
    if (!this.found) {
      this.shoppingCart.quantity = 1;
      if(this.shoppingCarts) {
        this.shoppingCarts?.push(this.shoppingCart);
      } else {
        this.shoppingCarts = [this.shoppingCart];
      }
    }
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
  }

  setUserId(): void {
    this.found = false;
    if(localStorage.getItem('user')) {
      this.userService.getUsersByEmail(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any)=>
      {
        this.shoppingCart.userId = data.body.id;
        this.localStorageProducts();
        this.addProduct();
      })
    } else {
      if(!localStorage.getItem('userId')) {
        let current = new Date();
        localStorage.setItem('userId', JSON.stringify(current.getTime()));
      }
      this.shoppingCart.userId = JSON.parse(localStorage.getItem('userId')!);
      this.localStorageProducts();
      this.addProduct();
    }
  }

  addProduct(): void {
    this.getShoppingCartsByUserId(this.shoppingCart.userId!).subscribe((data:any)=> {
      if(data.body) {
        for(let s of data.body) {
          if(s.product.id == this.shoppingCart.product?.id) {
            this.found = true;
            s.quantity = this.shoppingCart.quantity;
            this.updateShoppingCart(s).subscribe();
          }
        }
      }
      if(!this.found) {
        this.addToShoppingCart(this.shoppingCart).subscribe();
      }
    })
  }

  delete(shoppingCart: ShoppingCart, quantity: number) {
    this.shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts')!);
    if(quantity == shoppingCart.quantity) {
      this.shoppingCarts?.forEach((s, index)=>{
        if(s.product?.id == shoppingCart.product?.id) {
          this.shoppingCarts?.splice(index, 1);
        }
      })
      localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
      this.getShoppingCartsByUserId(shoppingCart.userId!).subscribe((data:any) => {
        if(data.body) {
          for(let s of data.body) {
            if(s.product.id == shoppingCart.product?.id) {
              this.deleteShoppingCart(s).subscribe();
            }
          }
        }
      })
    } else {
      for(let s of this.shoppingCarts!) {
        if(s.product!.id == shoppingCart.product?.id) {
          s.quantity! -= quantity;
        }
      }
      localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
      this.getShoppingCartsByUserId(shoppingCart.userId!).subscribe((data:any) => {
        if(data.body) {
          for(let s of data.body) {
            if(s.product.id == shoppingCart.product?.id) {
              s.quantity -= quantity;
              this.updateShoppingCart(s).subscribe();
            }
          }
        }
      })
    }
  }

  public addToShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType>{
    return this.http.post<ShoppingCart>(this.SHOPPING_CART_URL, shoppingCart, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }

  public updateShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType> {
    return this.http.put<ShoppingCart>(this.SHOPPING_CART_URL, shoppingCart, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }
  public getShoppingCartsByUserId(id: number) : Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ShoppingCart[]>(this.SHOPPING_CART_URL + "/findByUserId", {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getShoppingCartsByUserEmail(email: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('email', email);
    return this.http.get<ShoppingCart[]>(this.SHOPPING_CART_URL + "/findByEmail", {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public deleteShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType> {
    return this.http.delete<ShoppingCart>(this.SHOPPING_CART_URL, {body: shoppingCart, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }


}
