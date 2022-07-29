import { environment } from './environment';

const baseURL = environment.baseURL;

export default {
  user: `${baseURL}/user`,
  users: `${baseURL}/users`,
  post: `${baseURL}/post`,
  posts: `${baseURL}/posts`,
  auth: `${baseURL}/auth`,
};
