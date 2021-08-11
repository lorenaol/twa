import { Component, OnInit } from '@angular/core';
import {Product} from "@app/entities/product";
import {ShoppingCart} from "@app/entities/shoppingcart";
import {UserService} from "@app/services/user.service";
import {HttpResponse} from "@angular/common/http";
import {User} from "@app/entities/user";
import {faShoppingCart, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Shopping_cartService} from "@app/services/shopping_cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products? :Product[] | null
  faShoppingCart = faShoppingCart;
  faTrash = faTrash;
  total : number = 0;
  deliveryCost: number = 0;
  productsCost: number = 0;

  constructor( private shopping_cartService: Shopping_cartService) {
    this.shopping_cartService.productsCurrentUser?.subscribe(products => this.products = products);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    (async () => {
      //this.shopping_cartService.getProducts();
      this.shopping_cartService.set();
      await  this.delay(1000);
      this.shoppingCarts = this.shopping_cartService.get();
      console.log(this.shoppingCarts)
      await  this.delay(1000);
      this.setImage();
    })();
  }
  shoppingCarts?: ShoppingCart[] | null;


  emptyCart() : boolean {
    //console.log(this.products)
    return this.shoppingCarts?.length == 0;
  }


  setImage(): void {
    this.total = 0;
    this.productsCost = 0;
    this.deliveryCost = 0;
    for(let cart of this.shoppingCarts!) {
      this.productsCost += cart?.product?.price! * cart?.quantity!;
      // console.log(cart?.product?.price! * cart?.quantity!)
      let imageWrapper = document.querySelector('.image' + cart?.product?.id);
      let image = new Image(150, 150);

      image.src = "data:image/png;base64," + cart?.product?.image;
      image.alt = cart?.product?.name || '';
      if (imageWrapper) imageWrapper.appendChild(image);
    }
    this.productsCost= Number((Math.round(this.productsCost * 100) / 100).toFixed(2));
    this.total = this.productsCost + this.deliveryCost;
    this.total= Number((Math.round(this.total * 100) / 100).toFixed(2));
    //console.log(this.total)

  }

  delete(product?:Product): void {
    console.log("delete");
    (async () => {
      this.shopping_cartService.delete(product);
      await  this.delay(100);
      this.ngOnInit();
      // await  this.delay(1000);
      // this.setImage();
    })();

  }

}
