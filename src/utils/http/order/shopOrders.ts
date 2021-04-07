import { GoodProp } from '../goods/goodList';
import { MerchantInfo } from '../shop/getMerchantMyself';
import { UserInfo } from '../user/getInfo';
import { httpGet } from '../main';

export type StatusType =
  | 'create'
  | 'expressed'
  | 'expressing'
  | 'paying'
  | 'finish'
  | 'abandon'
  | 'abandoned'
  | 'payed'
  | 'overtime'
  | 'expired'
  | 'revert'
  | 'waiting';

export interface OrderDetail {
  /**
   * 订单 id
   * */
  oid: number;
  /**
   * 价格
   * */
  money: number;
  /**
   * 定金
   * */
  pledge: number;
  /**
   * 借用时间
   * */
  time: number;
  /**
   * 用户租用超时时间
   * */
  expiredTime: number;
  /**
   * 创建时间
   * */
  createTime: string;
  /**
   * 订单状态
   * */
  status: StatusType;
  /**
   * 卖家快递号
   * */
  express: null | string;
  /**
   * 买家家快递号
   * */
  revert: null | string;
  /**
   * 买家姓名
   * */
  name: string;
  /**
   * 电话
   * */
  phone: string;
  /**
   * 地址
   * */
  address: string;
  good: GoodProp;
  merchant: MerchantInfo;
  user: UserInfo;
  /**
   * 数量
   * */
  num: number;
  pid: string;
}

export interface OrderSearchResult {
  /**
   * 总数
   * */
  total: number;
  /**
   * 结果
   * */
  list: OrderDetail[];
}

/**
 * 获取订单]
 * @param pageSize 页面大小
 * @param status 状态
 * @param pageNum 页数
 * */
export async function getShopOrders(
  pageNum: number,
  status: StatusType | null,
  pageSize: number,
): Promise<OrderSearchResult> {
  const url =
    status !== null
      ? `/order/merchant?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=ASC&status=${status}`
      : `/order/merchant?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=ASC`;
  return await httpGet<undefined, OrderSearchResult>(url, undefined);
}
