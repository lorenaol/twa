import {Product} from "@app/entities/product";

export class Category {
  id?: number;
  categoryName?: string;
  categoryCode?: string;
  categoryDescription?: string;
  storeId?: string;
  dateAdded?: Date;
  products?: Product[];
}
