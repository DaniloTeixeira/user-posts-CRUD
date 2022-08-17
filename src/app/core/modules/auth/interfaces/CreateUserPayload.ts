import { AccessType } from 'src/app/core/types/AccessType';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  accessType: AccessType;
}
