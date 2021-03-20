import { httpPut } from '../main';
import { GoodDetail } from '../goods/getGoodDetail';

/**
 * 上传的租金数据
 * */
export interface UploadRent {
  /**
   * 时长
   * */
  time: number;
  /**
   * 租金
   * */
  rent: number;
  /**
   * 保证金
   * */
  pledge: number;
}

/**
 * 更新商品的租金价格
 * */
export async function updateRent(rents: UploadRent[], gid: number): Promise<GoodDetail> {
  return httpPut<UploadRent[], GoodDetail>(`/merchant/good/rent/${gid}`, rents);
}
