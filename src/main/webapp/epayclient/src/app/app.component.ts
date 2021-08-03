import {Component} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {Authorities} from "@app/enums/authorities";
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Shopping_cartService} from "@app/services/shopping_cart.service";
import {Product} from "@app/entities/product";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

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
  products?: Product[] | null


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private shopping_cartService : Shopping_cartService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.shopping_cartService.productsCurrentUser?.subscribe(products => this.products = products)
  }

  logout() {
    this.authenticationService.logout();
    this.shopping_cartService.getProducts();
  }


  login() {
    this.authenticationService.showLogin();
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }

  getProducts(): void {
    this.shopping_cartService.f();
    this.shopping_cartService.updateCart();
    this.shopping_cartService.getProducts();
   /* this.shopping_cartService.getProductsByUserName('unauthenticatedUser').subscribe((data: HttpResponse<Product[]>) => {
      this.products = data.body;
    })*/
  }


}


