import { AccessType } from '../types/AccessType';

export interface User {
  id: number;
  name: string;
  email: string;
  accessType: AccessType;
  createdAt: string;
}
