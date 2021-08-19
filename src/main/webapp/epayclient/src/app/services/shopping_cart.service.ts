import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {ShoppingCart, ShoppingCartDto} from "@app/entities/shoppingcart";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@environments/environment";
import {UserService} from "@app/services/user.service";
import {Product} from "@app/entities/product";
import {User} from "@app/entities/user";

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
  shoppingCartDto = new ShoppingCart();
  shoppingCartsDto : ShoppingCart[] | null = [];
  static shoppingCartId = 0;

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  products: Product[] = [];

  init(product: any): void {
    this.inputProduct = product;
    (async () => {
      this.setQuantity();
      //await this.delay(1000);
      // this.updateCart();
      await this.delay(1000);
      this.newFunction();
     // await  this.delay(1000);
      // this.call();
    })();

  }
  newFunction(): void {
    this.shoppingCartsDto =  JSON.parse(localStorage.getItem('shoppingCarts')!);
    this.find = false;
    let currentUserName = localStorage.getItem('user') != null?
      JSON.parse(localStorage.getItem('user')!).name : 'unauthenticatedUser';
    let currentUserId = JSON.parse(localStorage.getItem('userId')!);
    if(this.shoppingCartsDto) {
      for (let shoppingCartDto of this.shoppingCartsDto!) {
        if (shoppingCartDto?.user?.id == this.shoppingCart.user?.id && shoppingCartDto.product?.id == this.inputProduct?.id) {
          this.find = true;
          shoppingCartDto.quantity! += 1;
        }
      }
    }

    if(!this.find) {
      console.log('intra');
      //Shopping_cartService.shoppingCartId++;
      this.shoppingCartDto.quantity = 1;
      this.shoppingCartDto.product = this.inputProduct;
      this.shoppingCartDto.user =this.shoppingCart.user;
      console.log(this.shoppingCart.user);
     // this.shoppingCartDto.id = Shopping_cartService.shoppingCartId;

      if(this.shoppingCartsDto) {
        this.shoppingCartsDto?.push(this.shoppingCartDto);
      } else {
        this.shoppingCartsDto = [this.shoppingCartDto];
      }
    }
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCartsDto));
    console.log(localStorage.getItem('userId'));

  }
  selectOldProducts(): void {
    console.log('old');
    this.shoppingCartsDto =  JSON.parse(localStorage.getItem('shoppingCarts')!);
    this.getShoppingCartsByUserName(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:HttpResponse<ShoppingCart[]>)=> {
     if(data.body) {
       if(this.shoppingCartsDto) {
         for (let s of data.body) {
           this.shoppingCartsDto!.push(s);
         }
         localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCartsDto));
       } else {
         localStorage.setItem('shoppingCarts', JSON.stringify(data.body));
       }

     }

    })
  }
  updateCart(): void {
    // if(localStorage.getItem('user') != null) {
      let currentUserId =  localStorage.getItem('userId') != null?
        JSON.parse(localStorage.getItem('userId')!) :0;
      if (localStorage.getItem('userId')) {
          this.getShoppingCartsById(currentUserId).subscribe((data: HttpResponse<ShoppingCart[]>) => {
            if(data.body) {
              for (let shoppingCart of data.body!) {
                this.userService.getUsersByName(JSON.parse(localStorage.getItem('user')!).userName)
                  .subscribe((data2: HttpResponse<User>) => {
                    shoppingCart.user = data2.body;
                    this.updateShoppingCart(shoppingCart).subscribe((data: HttpResponse<ShoppingCart>) => {
                    });
                  })

              }
            }
          })
      }
    //   if (localStorage.getItem('userId')) {
    //     this.getShoppingCartsById(currentUserId).subscribe((data: HttpResponse<ShoppingCart[]>) => {
    //       /*this.getShoppingCartsByUserName(JSON.parse(localStorage.getItem('user')!).name).subscribe((data2: HttpResponse<ShoppingCart[]>) =>{
    //         if(data.body) {
    //           if(data2.body) {
    //             for(let shoppingCart of data.body!) {
    //               let ok =0;
    //               for(let shoppingCart2 of data2.body!) {
    //                 if(shoppingCart.product?.id == shoppingCart2.product?.id) {
    //                   ok++;
    //                   shoppingCart2.quantity! += shoppingCart.quantity!;
    //                   this.updateShoppingCart(shoppingCart2).subscribe();
    //                   this.deleteShoppingCart(shoppingCart).subscribe();
    //                 }
    //               }
    //               if(ok ==0) {
    //                 shoppingCart.user = data2.body[1].user;
    //                 this.updateShoppingCart(shoppingCart).subscribe();
    //               }
    //             }
    //           }
    //         } else {
    //           let ok =0;
    //           if(data2.body) {
    //             for(let shoppingCart of data2.body!) {
    //               Shopping_cartService.shoppingCartId++;
    //               this.shoppingCartDto.quantity = shoppingCart.quantity;
    //               this.shoppingCartDto.product = shoppingCart.product;
    //               this.shoppingCartDto.user = shoppingCart.user;
    //               this.shoppingCartDto.id = Shopping_cartService.shoppingCartId;
    //               if(ok ==0){
    //                 this.shoppingCartsDto = [this.shoppingCartDto];
    //               } else {
    //                 this.shoppingCartsDto?.push(this.shoppingCartDto);
    //               }
    //             }
    //             localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCartsDto));
    //           }
    //
    //         }
    //       })*/
    //       if (data.body) {
    //         for (let shoppingCart of data.body!) {
    //           shoppingCart.user = this.shoppingCart.user;
    //           this.updateShoppingCart(shoppingCart).subscribe((data: HttpResponse<ShoppingCart>) => {
    //           });
    //         }
    //       }
    //     })
    //   }
    // }
  }
  user?: User;
  find?:boolean
  setQuantity() : void {
    this.find = false;
    let currentUserName = localStorage.getItem('user') != null?
        localStorage.getItem('user')!.split(`"`)[3] : 'unauthenticatedUser';
    let currentUserId =  localStorage.getItem('userId') != null?
      JSON.parse(localStorage.getItem('userId')!) :0;
    if(localStorage.getItem('user') != null) {

      this.getShoppingCartsByUserName( currentUserName).subscribe((data:HttpResponse<ShoppingCart[]>) => {
        this.shoppingCarts = data.body;
        if(data.body?.length != 0) {
          for(let shoppingCart of data.body!) {
            if(shoppingCart.product?.id == this.inputProduct?.id) {
              this.find = true;
              shoppingCart.quantity! += 1;
              this.updateShoppingCart(shoppingCart).subscribe((data : HttpResponse<ShoppingCart>) => {});
              return;
            }
          }
        }
        if(!this.find) {
          this.shoppingCart.quantity = 1;
          this.shoppingCart.product = this.inputProduct;
          //  this.shoppingCartDto.product = this.inputProduct;
            this.userService.getUsersByName(localStorage.getItem('user')!.split(`"`)[3])
              .subscribe((data: HttpResponse<User>) => {
                this.shoppingCart.user = data.body;
                this.addToShoppingCart( this.shoppingCart).subscribe((data : HttpResponse<ShoppingCart>) => {
                  this.shoppingCartDto.id = data.body?.id;
                })

                //localStorage.setItem('userId', JSON.stringify(data.body?.id));
                })

        }
      })
    } else {
      if(localStorage.getItem('userId')) {
       // this.shoppingCart.user = this.user;
        console.log("but whyyyyy?");
        this.getShoppingCartsById(currentUserId).subscribe((data: HttpResponse<ShoppingCart[]>) => {
          this.shoppingCarts = data.body;
          if (data.body?.length != 0) {
            for (let shoppingCart of data.body!) {
              if (shoppingCart.product?.id == this.inputProduct?.id) {
                this.find = true;
                shoppingCart.quantity! += 1;
                this.updateShoppingCart(shoppingCart).subscribe((data: HttpResponse<ShoppingCart>) => {
                });
                return;
              }
            }
          }
          if (!this.find) {
            this.shoppingCart.quantity = 1;
            this.shoppingCart.product = this.inputProduct;
            //  this.shoppingCartDto.product = this.inputProduct;

              this.userService.getUserById(JSON.parse(localStorage.getItem('userId')!)).subscribe((data: HttpResponse<User>) => {
                this.shoppingCart.user = data.body;
                this.addToShoppingCart(this.shoppingCart).subscribe((data: HttpResponse<ShoppingCart>) => {
                  this.shoppingCartDto.id = data.body?.id;
                })
              })

          }
        })
      } else {
        console.log("new user");
        this.shoppingCart.quantity = 1;
        this.shoppingCart.product = this.inputProduct;
        const user = new User();
        user.name = "unauthenticatedUser";
        user.email = "-";
        user.password = "-";
        user.is_active = false;
        user.address = "-";
        user.end_date = new Date();
        user.start_date = new Date();
        user.latitude = 0;
        user.longitude = 0;
        this.userService.addUser(user).subscribe((data: HttpResponse<User>) => {
          this.shoppingCart.user = data.body;
          //this.user = user;
          this.addToShoppingCart(this.shoppingCart).subscribe((data: HttpResponse<ShoppingCart>) => {
            this.shoppingCartDto.id = data.body?.id;
          })
          console.log(data.body?.id);
          localStorage.setItem('userId', JSON.stringify(data.body?.id));
        });

      }

    }

  }
  delete(cart:ShoppingCart): void {
    this.shoppingCartsDto =  JSON.parse(localStorage.getItem('shoppingCarts')!);
    this.shoppingCartsDto?.forEach((shoppingCartDto, index)=>{
      if(shoppingCartDto.user?.id == cart.user?.id && shoppingCartDto.product?.id == cart?.product?.id){
        this.shoppingCartsDto?.splice(index,1);
      }
    })
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCartsDto));
    this.getShoppingCartsById(cart.user?.id!).subscribe((data:HttpResponse<ShoppingCart[]>) => {
      if(data.body?.length != 0) {
        for(let shoppingCart of data.body!) {
          if(shoppingCart.product?.id == cart.product?.id) {
            this.deleteShoppingCart(cart).subscribe();

          }
        }
      }
    })

  }


  updateQuantity(cart:ShoppingCart, quantity: number): void {
    console.log(cart);
    this.shoppingCartsDto =  JSON.parse(localStorage.getItem('shoppingCarts')!);
    let currentUserName = localStorage.getItem('user') != null?
      localStorage.getItem('user')!.split(`"`)[3] : 'unauthenticatedUser';
    for (let shoppingCartDto of this.shoppingCartsDto!) {
      if (shoppingCartDto?.user?.id == cart.user?.id && shoppingCartDto.product?.id == cart?.product?.id) {
        shoppingCartDto.quantity! -= quantity;
      }
    }
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCartsDto));
    this.getShoppingCartsById(cart.user?.id!).subscribe((data:HttpResponse<ShoppingCart[]>) => {
      if(data.body?.length != 0) {
        for(let shoppingCart of data.body!) {
          if(shoppingCart.product?.id == cart.product?.id) {
           shoppingCart.quantity! -= quantity;
            this.updateShoppingCart(shoppingCart).subscribe();
          }
        }
      }
    })
  }


  // call():void {
  //   if(!this.find) {
  //     (async () => {
  //       console.log("nu nu");
  //
  //     //  this.f();
  //       await this.delay(1000);
  //     //  this.g();
  //     })();
  //   }
  // }
  //
  // f(): void {
  //
  // }
  //
  // g(): void {
  //   this.addToShoppingCart( this.shoppingCart).subscribe((data : HttpResponse<ShoppingCart>) => {
  //   })
  // }

  public addToShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType>{
    return this.http.post<ShoppingCart>(this.SHOPPING_CART_URL, shoppingCart, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }

  public updateShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType> {
    return this.http.put<ShoppingCart>(this.SHOPPING_CART_URL, shoppingCart, {observe: 'response'})
      .pipe(map((res:EntityResponseType) => res));
  }
  public getShoppingCartsById(id: number) : Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ShoppingCart[]>(this.SHOPPING_CART_URL + "/findById", {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  public getShoppingCartsByUserName(name: string): Observable<EntityArrayResponseType> {
    const params = new HttpParams().set('name', name);
    return this.http.get<ShoppingCart[]>(this.SHOPPING_CART_URL + "/findByName", {params, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  public getProductsByUserName(name : string) : Observable<HttpResponse<Product[]>> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Product[]>(this.SHOPPING_CART_URL + "/findProductsByName", {params, observe: 'response' })
      .pipe(map((res: HttpResponse<Product[]>) => res));
  }

  public deleteShoppingCart(shoppingCart: ShoppingCart): Observable<EntityResponseType> {
    return this.http.delete<ShoppingCart>(this.SHOPPING_CART_URL, {body: shoppingCart, observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }


}
