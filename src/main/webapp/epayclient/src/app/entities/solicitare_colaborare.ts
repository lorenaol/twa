import {User} from "@app/entities/user";
import {Anunt} from "@app/entities/anunt";

export class Solicitare_colaborare {
  id?: number;
  user?: User;
  anunt?: Anunt;
  accepted?: boolean;
  dataSolicitare?: Date;
  dataRaspuns?: Date;
}
