import {Component} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {Authorities} from "@app/enums/authorities";
import { faUser, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Shopping_cartService} from "@app/services/shopping_cart.service";
import {Product} from "@app/entities/product";
import {environment} from "@environments/environment";
import {ShoppingCart} from "@app/entities/shoppingcart";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Authorities = Authorities;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  user!: UserWithAuthoritiesDto | null;
 // products?: Product[] | null

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private shopping_cartService : Shopping_cartService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  //  this.shopping_cartService.productsCurrentUser?.subscribe(products => this.products = products);
   // localStorage.setItem('shoppingCart', JSON.stringify([]));
  }

  logout() {
    this.authenticationService.logout();
    //this.shopping_cartService.getProducts();
  }


  login() {
    this.authenticationService.showLogin();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }
  shoppingCarts?: ShoppingCart[] | null;
  getCarts() : void {
    console.log("getCarts");
    (async () => {
      this.shopping_cartService.f();
      this.shopping_cartService.updateCart();
      this.shopping_cartService.set();
      await this.delay(1000);
      this.shoppingCarts = this.shopping_cartService.get();
      await this.delay(0);
      this.setImage();
    })();
  }

  /*count :number = 0
  getProducts(): void {
    this.count++;
    this.shopping_cartService.f();
    this.shopping_cartService.updateCart();
    this.shopping_cartService.getProducts();
    //if(this.count == 1)
    //this.setImage();
  }*/

  setImage(): void {
    for(let cart of this.shoppingCarts!) {
      let imageWrapper = document.querySelector('.image2' + cart?.product?.id);
      let image = new Image(30, 30);

      image.src = "data:image/png;base64," + cart?.product?.image;
      image.alt = cart?.product?.name || '';
      if (imageWrapper) imageWrapper.appendChild(image);
    }
  }


  inShoppingCart() : boolean {
    return this.router.url == '/shoppingcart';
  }

}


