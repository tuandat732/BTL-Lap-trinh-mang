import { Model } from './model';

export type Roles = 'admin' | 'superadmin' | 'user';

export class User extends Model {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: Roles;
  address?: string;
  lastToken?: string;
  locations?: any;

  constructor(args: Partial<User>) {
    super(args);
    super.doInit(args);
  }
}
