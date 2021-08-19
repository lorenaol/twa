import {Category} from "@app/entities/category";
import {Image} from "@app/entities/image";

export class Product {
  id?: number;
  price?: number;
  name?: string;
  quantity?: number;
  expireDate?: Date;
  sku?: string;
  code?: string;
  category?: Category;
  image?: string;
  images?: Image[];
}
