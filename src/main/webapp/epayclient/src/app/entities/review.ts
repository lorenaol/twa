import {User} from "@app/entities/user";
import {Product} from "@app/entities/product";

export class Review {
  id?: number;
  product?: Product;
  userName?: string
  // productId?: number;
  text?: string;
  text2?:string
  stars?: number;
}

