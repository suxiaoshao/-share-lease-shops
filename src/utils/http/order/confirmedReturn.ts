import { httpPost } from '../main';

/**
 * 确认用户退货成功
 * @param oid 订单号
 * */
export async function confirmedReturn(oid: number): Promise<undefined> {
  return await httpPost(`/order/abandoned/${oid}`, undefined);
}
