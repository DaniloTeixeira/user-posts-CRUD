import { environment } from './environment';

const baseURL = environment.baseURL;

export default {
  user: `${baseURL}/user`,
  post: `${baseURL}/post`,
  auth: `${baseURL}/auth`,
};
