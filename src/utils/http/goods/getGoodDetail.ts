import { httpGet } from '../main';
import { GoodProp } from './goodList';

export interface GoodDetail extends GoodProp {
  prices: GoodPrice[];
}

export interface GoodPrice {
  gpid: number;
  gid: number;
  time: number;
  price: number;
  pledge: number;
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
