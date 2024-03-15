export interface SignInResponse {
  user: {
    id: number;
    email: string;
    name: string;
    password: string;
    accessType: string;
    createdAt: string;
  };
  token?: string;
}
