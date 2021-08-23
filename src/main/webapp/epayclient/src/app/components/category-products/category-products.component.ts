import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "@app/services/category.service";
import {Category} from "@app/entities/category";
import {Product} from "@app/entities/product";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {Shopping_cartService} from "@app/services/shopping_cart.service";
@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  id?: number;
  category?: Category;
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  faHeart = faHeart;
  faCart = faShoppingCart;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private shoppingCartService: Shopping_cartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    (async () => {
      this.loadData();
      await this.delay(1000);
      this.setImage();
      this.setStock();
    })();
  }

  loadData(): void{
    if(this.id)
      this.categoryService.getCategoryById(this.id).subscribe((data: any) => {
        this.category = data.body;
      });
  }

  addToCart(product?: Product): void {
    this.shoppingCartService.init(product);
  }

  setImage(): void{
    let imageWrapper = document.querySelectorAll('.image');
    let i;
    if(this.category?.products)
    for(i = 0; i < this.category?.products?.length;i++){
      let image = new Image(100,100);
      image.src = "data:image/png;base64," + this.category.products[i].image;
      image.alt = this.category.products[i].name || "";
      if(imageWrapper)
        imageWrapper[i].appendChild(image);
    }
  }

  inStock(product: Product): string{
    let stock: string = "Out of stock";
    if(product.quantity){
      if(product.quantity > 10)
        stock = "in stock";
      else if(product.quantity <= 10 && product.quantity > 1)
        stock = `Last ${product.quantity} products`;
      else if(product.quantity === 1)
        stock = "Last product in stock";
    }
    return stock;
  }

  setStock(): void{
    let stock = document.querySelectorAll('.stock');
    let i;
    if(this.category?.products)
      for(i = 0; i < this.category?.products?.length;i++){
        if(this.category.products[i].quantity!==undefined && stock){

          // @ts-ignore
          if(this.category.products[i].quantity > 10)
            stock[i].classList.add("superstock");

          else { // @ts-ignore
            if(this.category.products[i].quantity <=10 && this.category.products[i].quantity >= 1 )
                        stock[i].classList.add("minstock");
                      else
                        stock[i].classList.add("outstock");
          }
        }
      }
  }
}
