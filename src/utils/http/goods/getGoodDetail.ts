import { httpGet } from '../main';
import { GoodProp } from './goodList';
import { MerchantInfo } from '../shop/getMerchantMyself';
import { UploadRent } from '../shop/updateRent';

export interface GoodDetail extends GoodProp {
  rents: RentInfo[];
  merchant: MerchantInfo;
}

export interface RentInfo extends UploadRent {
  /**
   * 租 id
   * */
  rid: number;
  /**
   * 商品 id
   * */
  gid: number;
}

/**
 * 获取商品详细信息
 * @param gid 商品号
 * */
export async function getGoodDetail(gid: number): Promise<GoodDetail> {
  const data = await httpGet<undefined, GoodDetail | undefined>(`/good/${gid}`, undefined);
  if (data === undefined) {
    throw new Error('商品不见了');
  } else {
    return data;
  }
}
