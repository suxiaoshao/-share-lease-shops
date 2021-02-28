import { httpGet } from '../main';

export interface UserInfo {
  uid: number;
  email: string;
  username: string;
  password: string;
  phone: string | null;
  level: number;
  avatar: string | null;
  accessToken: string;
}

export async function getInfo(uid: string): Promise<UserInfo> {
  return await httpGet<undefined, UserInfo>(`/user/getInfo?uid=${uid}`, undefined);
}
