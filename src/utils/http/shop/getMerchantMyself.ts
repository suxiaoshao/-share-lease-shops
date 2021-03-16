import { GoodProp } from '../goods/goodList';
import { httpGet } from '../main';

export interface MerchantInfo {
  /**
   * 商店 id
   * */
  mid: number;
  /**
   * 店名
   * */
  name: string;
  /**
   * 描述
   * */
  info: string;
  /**
   * 商店管理员 id
   * */
  uid: number;
  /**
   * 货物
   * */
  goods: GoodProp[];
}

/**
 * 获取自身商店信息
 * */
export async function getMerchantMyself(): Promise<MerchantInfo> {
  return await httpGet<undefined, MerchantInfo>('/merchant/myself', undefined);
}
