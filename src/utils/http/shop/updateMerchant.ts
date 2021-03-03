import { httpPut } from '../main';
import { shopInfoStore } from '../../store/shopInfo.store';

interface UpdateMerchantInterface {
  /**
   * 商店 di
   * */
  mid: number;
  /**
   * 商店名
   * */
  name: string;
  /**
   * 商店描述
   * */
  info: string;
}

export async function updateMerchant(name: string, info: string): Promise<undefined> {
  return await httpPut<UpdateMerchantInterface, undefined>('/merchant', {
    mid: shopInfoStore.getData()?.mid ?? -1,
    name,
    info,
  });
}
