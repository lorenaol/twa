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
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  text?: string;
  reviews : Review[]=[
    {id : 1, userName: 'Andre', text: 'beauty', text2: 'beauty2fr', stars: 3 },
    {id : 2, userName: 'Alexde', text: 'beauty', text2: 'beauty2fr', stars: 2 },
    {id : 3, userName: 'Aoeoer', text: 'beauty', text2: 'beauty2fr', stars: 5 },
    {id : 4, userName: 'Emmid', text: 'beauty', text2: 'beauty2fr', stars: 6 },
  ]


  constructor(  private router: Router,
                private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    // this.product = JSON.parse(localStorage.getItem('anunt')!);
    // console.log(this.product)
    // this.setImage();
  }


}
