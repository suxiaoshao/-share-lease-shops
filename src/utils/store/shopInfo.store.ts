import { Store } from './store';
import { MerchantMyselfInfo } from '../http/shop/getMerchantMyself';
import { GoodProp } from '../http/goods/goodList';

/**
 * 群居商店信息
 * */
export class ShopInfoStore extends Store<MerchantMyselfInfo | null> {
  constructor() {
    super(null);
  }

  public updateGood(newGood: GoodProp): void {
    if (this.data !== null) {
      const changeIndex = this.data.goods.findIndex((value) => {
        return value.gid === newGood.gid;
      });
      if (changeIndex !== -1) {
        this.data.goods[changeIndex] = newGood;
      } else {
        this.data?.goods.push(newGood);
      }
      this.setData({ ...this.data });
    }
  }
}

export const shopInfoStore = new ShopInfoStore();

export const useShopInfo = shopInfoStore.getDataFunc();

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
