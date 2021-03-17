import { GoodProp } from '../goods/goodList';
import { httpGet } from '../main';

export interface MerchantMyselfInfo extends MerchantInfo {
  /**
   * 货物
   * */
  goods: GoodProp[];
}

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
}

/**
 * 获取自身商店信息
 * */
export async function getMerchantMyself(): Promise<MerchantMyselfInfo> {
  return await httpGet<undefined, MerchantMyselfInfo>('/merchant/myself', undefined);
}
