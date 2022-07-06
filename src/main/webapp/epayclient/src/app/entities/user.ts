export class User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  start_date?: Date;
  end_date?: Date;
  rol? : string
  latitude?: number;
  longitude?: number;
  address?: string;
  token?: string|null;
}

export class UserWithAuthoritiesDto {
  email?: string;
  authorityCode?: string[];
  authdata?: string;
}
