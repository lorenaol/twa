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
import { faUser, faShoppingCart, faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import {ShoppingCart} from "@app/entities/shoppingcart";
import {ShoppingCartService} from "@app/services/shoppingCart.service";
import {Product} from "@app/entities/product";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {ModalService} from "@app/services/modal.service";
import {ChannelService, ChatClientService, StreamI18nService} from "stream-chat-angular";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  Authorities = Authorities;
  ModalTypesEnum = ModalTypesEnum;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faGr = faGraduationCap;
  faBars = faBars;
  user!: UserWithAuthoritiesDto | null;
  categories?: Category[] | null;
  items: MenuItem[] = [{}];
  shoppingCarts?: ShoppingCart[] | null;
  private password: string | undefined;
  useri = [1,2,3];

  selectedOption: User | undefined;

  foods: User[] = [
    // {value: 'steak-0', viewValue: 'Steak'},
    // {value: 'pizza-1', viewValue: 'Pizza'},
    // {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private modalService: ModalService,
              private shoppingCartService : ShoppingCartService,

  ) {

    this.authenticationService.user.subscribe(x => this.user = x);
  }


   ngOnInit(): void {
    this.loadData();

  }

  chat() : void {
    this.router.navigate(["/chat"]);
  }

  loadData(): void {
    // this.categoryService.getCategories().subscribe((data: any) => {
    //   this.categories = data.body;
    //   this.loadItems();
    // })
    this.userService.getUsers().subscribe((data:any)=> {
      this.foods = data.body
    })
  }

  redirect(user: User) : void {

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
  openProductModal(modalTypeEnum: ModalTypesEnum, inputProduct?: Product) {
    this.modalService.openProductModal(modalTypeEnum, inputProduct).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }

  getCarts() : void {
    (async () => {
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
      this.shoppingCartService.delete(cart, cart.quantity!);
      this.getCarts();
  }

  signin() {
    this.authenticationService.showSignin();
  }

  changepass() {
    this.userService.showCPass();
  }

  myRequests() {
    this.router.navigate(["/cererile-mele"]);
  }

  myAnnounces() {
    this.router.navigate(["/anunturile-mele"]);
  }

  myClasses() {
    this.router.navigate(["/clasele-mele"]);
  }

  myProfile() {
    this.router.navigate(["/profilul-meu"]);
  }
static chat_user: String;
  goToUser() {
    console.log(AppComponent.chat_user);
    if(this.selectedOption?.email == "lorenaolescu@gmail.com") {
      AppComponent.chat_user = JSON.parse(localStorage.getItem("user")!).userName;
      localStorage.setItem('chat', JSON.stringify(AppComponent.chat_user));
      this.router.navigate(["/chat2"])
    } else {
      // AppComponent.chat_user = this.selectedOption!.name!;
      localStorage.setItem('chat', JSON.stringify( JSON.parse(localStorage.getItem("user")!).userName));
      this.router.navigate(["/chat"])
    }
  }
}


