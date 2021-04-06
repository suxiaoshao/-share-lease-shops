import { httpPost } from '../main';
import { UserDetail } from './getInfo';

export interface UserUpdateInfo {
  username: string;
  phone: string;
  avatar: string;
}

export async function update(username: string, phone: string, avatar: string): Promise<UserDetail> {
  return await httpPost<UserUpdateInfo, UserDetail>('/user/update', { username, phone, avatar });
}
