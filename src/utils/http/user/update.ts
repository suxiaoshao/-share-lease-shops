import { httpPost } from '../main';
import { UserInfo } from './getInfo';

export interface UserUpdateInfo {
  username: string;
  phone: string;
  avatar: string;
}

export async function update(username: string, phone: string, avatar: string): Promise<UserInfo> {
  return await httpPost<UserUpdateInfo, UserInfo>('/user/update', { username, phone, avatar });
}
