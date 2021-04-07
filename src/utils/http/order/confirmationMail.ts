/**
 * 确认寄回商品
 * @param oid 订单号
 * */
import { httpPost } from '../main';

export async function confirmationMail(oid: number): Promise<undefined> {
  return await httpPost(`/order/finish/${oid}`, undefined);
}
