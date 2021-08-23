import {User} from "./user";
import {Product} from "./product";

export class ShoppingCart {
  id?: number;
  userId?: number;
  product?: Product;
  quantity?: number;
}

export class ShoppingCartDto {
  id?: number;
  userId?: number | null;
  product?: Product;
  quantity?: number;
}
