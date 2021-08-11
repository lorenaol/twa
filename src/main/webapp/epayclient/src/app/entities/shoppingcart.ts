import {User} from "./user";
import {Product} from "./product";

export class ShoppingCart {
  id?: number
  user?: User | null
  product?: Product
  quantity?: number
}
