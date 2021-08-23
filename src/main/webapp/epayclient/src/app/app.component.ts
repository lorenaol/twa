import {Component, ViewEncapsulation} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/services/authentication.service";
import { Authorities } from "@app/enums/authorities";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Category} from "@app/entities/category";
import {CategoryService} from "@app/services/category.service";
import {MenuItem} from 'primeng/api';
import {UserService} from "@app/services/user.service";
import  {environment} from "@environments/environment";
import { faUser, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Shopping_cartService} from "@app/services/shopping_cart.service";
import {ShoppingCart} from "@app/entities/shoppingcart";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  Authorities = Authorities;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  user!: UserWithAuthoritiesDto | null;
  categories?: Category[] | null;
  items: MenuItem[] = [{}];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private shopping_cartService : Shopping_cartService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {
      this.loadData();

  }

  loadData(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.body;
      this.loadItems();
    })
  }

  f(category: Category): MenuItem[]{
    let v: MenuItem[]=[];
    if (category.products)
      for(let product of category.products){
         v = v.concat([
           {
             label: product.name,
             url:`${environment.browserURL}` + "products/" + product.id,
           }
           ]);
      }
    return v;
  }

  loadItems(): void{
    let i = 0;
    if(this.categories && this.items){
      for(let category of this.categories){
        if(i === 0)
          this.items[0] = {
            label: `${category.categoryName}`,
            url: `${environment.browserURL}` + "categories/" + category.id,
            items: this.f(category)
          };
        else
          this.items.push({
            label: `${category.categoryName}`,
            url: `${environment.browserURL}` + "categories/" + category.id,
            items: this.f(category)
          });
        i++;
      }
    }

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
      this.shopping_cartService.delete(cart, cart.quantity!);
      this.getCarts();
  }


 /* inShoppingCart() : boolean {
    return this.router.url == '/shoppingcart';
  }*/


  signin() {
    this.authenticationService.showSignin();
  }

  changepass() {
    this.userService.showFPass();
  }
}


