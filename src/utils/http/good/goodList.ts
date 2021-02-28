import { httpGet } from '../main';

export interface GoodProp {
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
  type: string;
  /**
   * 租金
   * */
  rent: number;
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
  /**
   * 商家 id
   * */
  mig: number;
}

export async function getGoodList(
  pageSize: number,
  pageNum: number,
  orderRule: 'ASC' | 'DESC',
  orderBy: 'price',
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good?pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&orderBY=${orderBy}`,
    undefined,
  );
}
