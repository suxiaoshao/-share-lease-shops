import { httpPost } from '../main';
import { UserDetail } from './getInfo';

export async function login(email: string, password: string): Promise<UserDetail> {
  return await httpPost<{ email: string; password: string }, UserDetail>('/user/login', { email, password });
}
