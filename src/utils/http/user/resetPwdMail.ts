import { httpGet } from '../main';

export async function resetPwdMail(email: string): Promise<undefined> {
  return await httpGet<undefined, undefined>(`/user/resetPassword/mail?email=${email}`, undefined);
}
