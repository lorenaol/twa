import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ProductService } from "@app/services/product.service";
import { Product } from "@app/entities/product";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {ShoppingCartService} from "@app/services/shoppingCart.service";
import {ReviewService} from "@app/services/review.service";
import {environment} from "@environments/environment";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id?: number;
  product?: Product;
  user?: string;
  estimateDate?: string;
  faCalendarDay = faCalendarDay;
  faTruck = faTruck;
  faUndo = faUndo;
  faScroll = faScroll;
  faShield = faShieldAlt;
  faHeart = faHeart;
  faCart = faShoppingCart;

  images: any[]=[];
  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private reviewService: ReviewService,
              private router: Router,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.loadData();

    this.user = (JSON.parse(localStorage.getItem("user") || '{}').userName );
    this.setDate();
  }

  addReview(): void {
    this.reviewService.setProduct(this.product!);
    //this.reviewService.setProductId(this.id);
    this.router.navigate(['/reviews']);
  }

  loadData(): void{
    if(this.id)
      this.productService.getProductById(this.id).subscribe((data: any) => {
        this.product = data.body;
        this.setImages();
      })
  }

  addToCart(product?: Product): void {
    this.shoppingCartService.init(product);
  }

  setImages(): void{
    if(this.product && this.product.images){
      let i = 1;
      let images2 = [];
      images2.push({
        source: "data:image/jpg;base64," + this.product.image,
        title: 'Title ' + i++
      });
      for(let image of this.product.images){
       images2.push({
          source: "data:image/jpg;base64," + image.imageCode,
          title: 'Title ' + i++
        });
      }
      this.images = images2;
    }
  }

  setDate(): void{
    let today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();
    if(today.getDay() === 4) //joi
      d += 3;
    else if(today.getDay() === 5)//vineri
      d += 4;
    else if(today.getDay() === 6)//sambata
      d += 3
    else
      d += 2;

    today = new Date(y, m, d);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(today);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
    this.estimateDate = `${da}-${mo}-${ye}`;
  }
}
