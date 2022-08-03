import { AccessType } from '../components/login/types/AccessType';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  accessType: AccessType;
}
