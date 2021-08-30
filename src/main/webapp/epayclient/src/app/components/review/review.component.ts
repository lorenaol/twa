import { Component, OnInit } from '@angular/core';
import {ReviewService} from "@app/services/review.service";
import {Review} from "@app/entities/review";
import {Product} from "@app/entities/product";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  text?: string;
  review = new Review();
  product?: Product;
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.product = this.reviewService.getProduct();
    console.log(this.product);
    this.setImage();
  }

  addReview(): void {
    this.review!.text = (<HTMLInputElement>document.getElementById(`review-body`)!).value;
    this.reviewService.setReview(this.review!);
  }

  setImage(): void {
    console.log(this.product);
    let imageWrapper = document.querySelector('.reviewImage');
    let image = new Image(80, 80);

    image.src = "data:image/png;base64," + this.product?.image;
    image.alt = this.product?.name || '';
    if (imageWrapper) imageWrapper.appendChild(image);

  }


}
