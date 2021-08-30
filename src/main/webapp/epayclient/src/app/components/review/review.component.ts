import { Component, OnInit } from '@angular/core';
import {ReviewService} from "@app/services/review.service";
import {Review} from "@app/entities/review";
import {Product} from "@app/entities/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  text?: string;
  review = new Review();
  product?: Product;
  constructor(  private router: Router,
                private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.product = this.reviewService.getProduct();
    this.setImage();
  }

  addReview(): void {
    this.review!.text = (<HTMLInputElement>document.getElementById(`review-body`)!).value;
    this.reviewService.setReview(this.review!);
    this.router.navigate(['products/' + this.product!.id]);
  }

  setImage(): void {
    console.log(this.product);
    let imageWrapper = document.querySelector('.reviewImage');
    let image = new Image(80, 80);

    image.src = "data:image/png;base64," + this.product?.image;
    image.alt = this.product?.name || '';
    if (imageWrapper) imageWrapper.appendChild(image);

  }

 /* getBase64MoreImages($event: any): void {
    let me = this;
    let i: number;
    me.images = [];
    for(i = 0; i < $event.currentFiles.length; i++){
      let file = $event.currentFiles[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if(reader.result?.toString().substring(23))
          if(me.images)
            me.images.push({
              imageCode: reader.result?.toString().substring(23)
            });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }*/


}
