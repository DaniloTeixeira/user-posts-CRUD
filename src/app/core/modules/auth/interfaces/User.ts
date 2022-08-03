import { CreateUserPayload } from './CreateUserPayload';

export interface User extends CreateUserPayload {
  id: number;
  created_at: Date;
}
