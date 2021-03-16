import { GoodType } from '../goods/goodList';
import { httpPut } from '../main';

export interface UpdateGoodProp {
  /**
   * 商品 id
   * */
  gid: number;
  /**
   * 名字
   * */
  name: string;
  /**
   * 类型
   * */
  type: GoodType;
  /**
   * 购买价格
   * */
  price: number;
  /**
   * 图片
   * */
  picUrl: string;
  /**
   * 描述
   * */
  info: string;
}

export async function updateGood(
  gid: number,
  name: string,
  type: GoodType,
  picUrl: string,
  price: number,
  info: string,
): Promise<undefined> {
  return await httpPut<UpdateGoodProp, undefined>('/merchant/good', {
    gid,
    name,
    type,
    picUrl,
    price,
    info,
  });
}
