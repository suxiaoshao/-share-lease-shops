import { httpGet } from '../main';

/**
 * 获取商店余额
 * */
export async function getMoney(): Promise<number> {
  return await httpGet('/merchant/money', undefined);
}
