import { httpGet } from '../main';

export enum GoodType {
  electronic = '电子器件',
  cloth = '服装',
  book = '图书音像',
  data = '账号数据',
}

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
  type: GoodType;
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
  mid: number;
  /**
   * 库存
   * */
  stock: number;
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
