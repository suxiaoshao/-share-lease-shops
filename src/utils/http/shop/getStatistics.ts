import { httpGet } from '../main';

export interface StatisticsData {
  /**
   * 日期
   * */
  date: string;
  /**
   * 那段时间里售出最多的商品ID
   * */
  gid: number;
  /**
   * 总金额
   * */
  money: number;
  /**
   * 总订单数
   * */
  num: number;
}

export async function getStatistics(time: 7 | 6 | 12 | 30, type: 'mouth' | 'day'): Promise<StatisticsData[]> {
  return await httpGet(`/merchant/statistics?time=${time}&type=${type}`, undefined);
}
