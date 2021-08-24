import { Component, OnInit } from '@angular/core';
import {Product} from "@app/entities/product";
import {ShoppingCart} from "@app/entities/shoppingcart";
import {faShoppingCart, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ShoppingCartService} from "@app/services/shoppingCart.service";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products?: Product[] | null
  faShoppingCart = faShoppingCart;
  faTrash = faTrash;
  total: number = 0;
  deliveryCost: number = 0;
  productsCost: number = 0;
  quantityToDelete : number =0;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit(): void {
    (async () => {
      this.shoppingCarts = JSON.parse(localStorage.getItem('shoppingCarts')!);
      await this.delay(0);
      this.setImage();
    })();
  }

  shoppingCarts?: ShoppingCart[] | null;


  emptyCart(): boolean {
    return this.shoppingCarts?.length == 0;
  }


  setImage(): void {
    this.total = 0;
    this.productsCost = 0;
    this.deliveryCost = 0;
    for (let cart of this.shoppingCarts!) {
      this.productsCost += cart?.product?.price! * cart?.quantity!;
      let imageWrapper = document.querySelector('.image' + cart?.product?.id);
      let image = new Image(150, 150);

      image.src = "data:image/png;base64," + cart?.product?.image;
      image.alt = cart?.product?.name || '';
      if (imageWrapper) imageWrapper.appendChild(image);
    }
    this.productsCost = Number((Math.round(this.productsCost * 100) / 100).toFixed(2));
    this.total = this.productsCost + this.deliveryCost;
    this.total = Number((Math.round(this.total * 100) / 100).toFixed(2));
  }

  myRound(x: number): number {
    return Number((Math.round(x * 100) / 100).toFixed(2));
  }

  arr:number[]=[];
  selectNumber(x: number): number[]{
    this.arr=[];
   for(let i = 1; i <=x; i++) {
     this.arr[i-1]=i;
   }
   return this.arr;
}


  delete(cart:ShoppingCart): void {
    this.shoppingCartService.delete(cart, this.quantityToDelete);
    this.ngOnInit();
  }

}
