import { AccessType } from 'src/app/core/types/AccessType';

export interface SignOnPayload {
  name: string;
  email: string;
  password: string;
  accessType: AccessType;
}
