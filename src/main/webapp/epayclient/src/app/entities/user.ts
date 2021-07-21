import {Authorities} from "@app/enums/authorities";

export class User{
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  start_date?: Date;
  end_date?: Date;

  // authorityCode?:Authorities[];
}
export class UserWithAuthoritiesDto{
  userName?: string;
  authorityCode?:string[];
  authdata?: string;
}
