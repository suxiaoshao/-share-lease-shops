import { httpPost } from '../main';

export async function register(username: string, password: string, email: string, code: string): Promise<undefined> {
  return await httpPost<{ username: string; password: string; email: string; code: string }, undefined>(
    '/user/register',
    { username, password, email, code },
  );
}
