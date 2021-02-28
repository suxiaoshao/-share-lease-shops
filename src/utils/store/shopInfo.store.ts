import { Store } from './store';
import { MerchantInfo } from '../http/shop/getMerchantMyself';

/**
 * 群居商店信息
 * */
export class ShopInfoStore extends Store<MerchantInfo | null> {
  constructor() {
    super(null);
  }
}

export const shopInfoStore = new ShopInfoStore();

export const useShopInfo = shopInfoStore.getDataFunc();
