import { httpPut } from '../main';

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
export async function updateRent(rents: UploadRent[], gid: number): Promise<undefined> {
  return httpPut<UploadRent[], undefined>(`/merchant/good/rent/${gid}`, rents);
}
