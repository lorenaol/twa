import {User} from "./user";
import {Role} from "./role";

export class User_role {
  id?: number;
  user?: User;
  role?: Role;
  start_date?: Date;
  end_date?: Date;
}
