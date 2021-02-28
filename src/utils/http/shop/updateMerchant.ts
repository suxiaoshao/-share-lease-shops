import { httpPut } from '../main';
import { shopInfoStore } from '../../store/shopInfo.store';

interface UpdateMerchantInterface {
  mid: number;
  name: string;
  info: string;
}

export async function updateMerchant(name: string, info: string): Promise<undefined> {
  return await httpPut<UpdateMerchantInterface, undefined>('/merchant', {
    mid: shopInfoStore.getData()?.mid ?? -1,
    name,
    info,
  });
}
