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

export type StatisticsType = 'mouth' | 'day';

/**
 * 获取图表数据
 * */
export async function getStatistics(time: number, type: StatisticsType): Promise<StatisticsData[]> {
  return await httpGet(`/merchant/statistics?time=${time}&type=${type}`, undefined);
}
