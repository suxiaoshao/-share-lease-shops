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

export async function good(i: number): Promise<GoodDetail> {
  return await httpGet<undefined, GoodDetail>(`/good/${i}`, undefined);
}
