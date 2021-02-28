import { httpPost } from '../main';
import { UserInfo } from './getInfo';

export async function login(email: string, password: string): Promise<UserInfo> {
  return await httpPost<{ email: string; password: string }, UserInfo>('/user/login', { email, password });
}
