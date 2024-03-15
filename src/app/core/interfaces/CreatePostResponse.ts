import { User } from 'src/app/core/interfaces/User';

export interface CreatePostResponse {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  author: User;
}
