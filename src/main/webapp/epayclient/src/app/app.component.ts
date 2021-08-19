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
  }

  logout() {
    this.authenticationService.logout();
    localStorage.removeItem('userId');
    localStorage.setItem('shoppingCarts', JSON.stringify([]));
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
     // this.shopping_cartService.f();
     // this.shopping_cartService.updateCart();
      //this.shopping_cartService.set();
    //  await this.delay(1000);
      this.shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts')!);
      await this.delay(0);
      this.setImage();
    })();
  }

  setImage(): void {
    if(this.shoppingCarts) {
      for (let cart of this.shoppingCarts!) {
        let imageWrapper = document.querySelector('.image2' + cart?.product?.id);
        let image = new Image(30, 30);

        image.src = "data:image/png;base64," + cart?.product?.image;
        image.alt = cart?.product?.name || '';
        if (imageWrapper) imageWrapper.appendChild(image);
      }
    }
  }
  delete(cart:ShoppingCart): void {
      this.shopping_cartService.delete(cart);
      this.getCarts();
  }


 /* inShoppingCart() : boolean {
    return this.router.url == '/shoppingcart';
  }*/

}


