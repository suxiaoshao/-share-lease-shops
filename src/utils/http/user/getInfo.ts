import { httpGet } from '../main';

export interface UserInfo {
  uid: number;
  email: string;
  username: string;
  phone: string | null;
  level: number;
  avatar: string | null;
}

export interface UserDetail extends UserInfo {
  password: string;
  accessToken: string;
}

export async function getInfo(uid: string): Promise<UserDetail> {
  return await httpGet<undefined, UserDetail>(`/user/getInfo?uid=${uid}`, undefined);
}
