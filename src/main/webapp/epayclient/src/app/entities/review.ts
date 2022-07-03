import {User} from "@app/entities/user";
import {Anunt} from "@app/entities/anunt";

export class Review {
  id?: number;
  anunt?: Anunt;
  userName?: string
  // productId?: number;
  text?: string;
  text2?:string
  stars?: number;
}

