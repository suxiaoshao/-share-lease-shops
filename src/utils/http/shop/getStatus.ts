import { httpGet } from '../main';

export interface ShopStatus {
  /**
   * 待发货商品数量
   * */
  payedNum: number;
  /**
   * 待确认租借收回商品数量
   * */
  revertNum: number;
  /**
   * 待确认退货商品数量
   * */
  abandonNum: number;
}

/**
 * 获取商店数据
 * */
export async function getStatus(): Promise<ShopStatus> {
  return await httpGet('/merchant/order/status', undefined);
}
