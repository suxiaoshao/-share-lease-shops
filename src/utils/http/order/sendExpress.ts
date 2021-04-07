import { httpPost } from '../main';

/**
 * 确认发货
 * @param express 快递号
 * @param oid 订单号
 * */
export async function sendExpress(express: string, oid: number): Promise<undefined> {
  return httpPost<undefined, undefined>(`/order/expressing/${oid}?express=${express}`, undefined);
}
