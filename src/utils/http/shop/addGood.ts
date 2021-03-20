import { GoodDetail } from '../goods/getGoodDetail';
import { httpPost } from '../main';
import { GoodType } from '../goods/goodList';
import { UploadRent } from './updateRent';

export interface UploadGood {
  name: string;
  type: GoodType;
  picUrl: string;
  info: string;
  price: number;
  rents: UploadRent[];
}

/**
 * 添加一个新商品
 * */
export async function addGood(uploadGood: UploadGood): Promise<GoodDetail> {
  return await httpPost<UploadGood, GoodDetail>('/merchant/good', uploadGood);
}
