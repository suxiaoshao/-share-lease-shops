import { Store } from './store';
import { getMerchantMyself, MerchantMyselfInfo } from '../http/shop/getMerchantMyself';
import { GoodProp } from '../http/goods/goodList';
import { asyncWithNotify } from '../hook/asyncWithNotify';

/**
 * 商店信息
 * */
export class ShopInfoStore extends Store<MerchantMyselfInfo | null> {
  constructor() {
    super(null);
  }

  /**
   * 更新 good 数据
   * @param newGood 新的一个 good 数据
   * */
  public updateGood(newGood: GoodProp): void {
    if (this.data !== null) {
      const changeIndex = this.data.goods.findIndex((value) => {
        return value.gid === newGood.gid;
      });
      if (changeIndex !== -1) {
        this.data.goods[changeIndex] = newGood;
      } else {
        this.data.goods.push(newGood);
      }
      this.setData({ ...this.data });
    }
  }

  /**
   * 从服务器更新数据
   * */
  public updateFromServer(): void {
    asyncWithNotify(getMerchantMyself, '成功获取商店信息').then((value) => {
      this.setData(value);
    });
  }

  /**
   * 初始化
   * */
  public initData(): void {
    this.setData(null);
  }
}

/**
 * shopInfo 实例
 * */
export const shopInfoStore = new ShopInfoStore();

/**
 * 获取商店数据的 hook 函数
 * */
export const useShopInfo = shopInfoStore.getDataFunc();

/**
 * 获取商店总商品的 hook 数据
 * */
export const useShopGoods = shopInfoStore.getComputeFunc<GoodProp[]>(
  (data) => data?.goods ?? [],
  (newComputeData, preData) =>
    preData === null
      ? null
      : {
          ...preData,
          goods: newComputeData,
        },
);
