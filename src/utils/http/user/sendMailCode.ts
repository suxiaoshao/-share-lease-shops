import { httpGet } from '../main';

/**
 * @description 发送注册右键
 * @author sushao
 * */
export async function sendMailCode(email: string): Promise<undefined> {
  return await httpGet<undefined, undefined>(`/user/register/mail?email=${email}`, undefined);
}
