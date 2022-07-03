import { Component, OnInit } from '@angular/core';
import {ReviewService} from "@app/services/review.service";
import {Review} from "@app/entities/review";
import {Product} from "@app/entities/product";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Anunt} from "@app/entities/anunt";



@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  text?: string;
  review = new Review();
  product?: Anunt;
  uploadedFiles: any[] = [];
  constructor(  private router: Router,
                private reviewService: ReviewService
                ) { }

  ngOnInit(): void {
    this.product = JSON.parse(localStorage.getItem('anunt')!);
    console.log(this.product)
    // this.setImage();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addReview(): void {
    (async () => {
      this.review!.text = (<HTMLInputElement>document.getElementById(`review-body`)!).value;
      this.review!.text2 = (<HTMLInputElement>document.getElementById(`review-body2`)!).value;
      this.review!.anunt = this.product;
      this.review!.stars = this.selected;
      this.review!.userName = JSON.parse(localStorage.getItem('user')!).userName;
      this.reviewService.addReview(this.review!).subscribe(()=>this.router.navigate(["/anunturi"]));
      // await this.delay(1000);
      // this.addImages();
      // this.router.navigate(['products/' + this.product!.id]);
    })();


  }
  selected! : number;

  setImage(): void {
    console.log(this.product);
    let imageWrapper = document.querySelector('.reviewImage');
    let image = new Image(80, 80);

    image.src = "data:image/png;base64," + this.product?.image;
    image.alt = this.product?.user?.name || '';
    if (imageWrapper) imageWrapper.appendChild(image);

  }

  images:  Map<number, string[]> = new Map<number, string[]>();
  event : any;
  setEvent($event: any) : void {
    this.event = $event;
  }
  images2?: string[] = [];
  getBase64MoreImages($event: any): void {
    let me = this;
    let i: number;
    me.images2 = [];
    for(i = 0; i < $event.currentFiles.length; i++){
      let file = $event.currentFiles[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if(reader.result?.toString().substring(23))
          if(me.images2)
            me.images2.push(
             reader.result?.toString().substring(23)
            );
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  addImages(): void {
    if(localStorage.getItem('images')){
      //this.images = JSON.parse(localStorage.getItem('images')!);
    }
    let imagesSrc = [];
    let reviewId = this.reviewService.getReviewId();
    let i: number;
    for(i = 0; i < this.images2!.length; i++){
      let file = this.event.currentFiles[i];
      file.src = "data:image/png;base64," + this.images2![i];
      file.alt = this.product?.user?.name || '';
      imagesSrc.push(file.src);
    }
    this.images.set(reviewId, imagesSrc);
    this.reviewService.setImages(this.images);
    //console.log(JSON.stringify(this.images));
   // localStorage.setItem('images', JSON.stringify(this.images));

  }




}
