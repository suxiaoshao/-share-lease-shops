import { getStatus, ShopStatus } from '../http/shop/getStatus';
import { Store } from './store';
import { asyncWithNotify } from '../hook/asyncWithNotify';

/**
 * 商店状态详情
 * */
export class ShopStatusStore extends Store<ShopStatus> {
  constructor() {
    super({ abandonNum: 0, payedNum: 0, revertNum: 0 });
  }

  /**
   * 从服务器更新数据
   * */
  public updateFromServer(): void {
    asyncWithNotify(getStatus).then((value) => {
      this.setData(value);
    });
  }

  /**
   * 初始化
   * */
  public initData(): void {
    this.setData({ abandonNum: 0, payedNum: 0, revertNum: 0 });
  }
}

/**
 * 商店状态的实例
 * */
export const shopStatusStore = new ShopStatusStore();
/**
 * 获取待处理总数的 hook 函数
 * */
export const useStatusTotalNum = shopStatusStore.getComputeFunc(
  (shopStatus) => shopStatus.abandonNum + shopStatus.payedNum + shopStatus.revertNum,
  (totalNum, preData) => preData,
);
/**
 * 获取商店状态全部数据
 * */
export const useStatusData = shopStatusStore.getDataFunc();
