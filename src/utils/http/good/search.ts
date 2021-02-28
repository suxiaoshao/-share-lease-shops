import { httpGet } from '../main';
import { GoodProp } from './goodList';

export async function search(
  keyword: string,
  pageSize = 10,
  pageNum = 0,
  oderRule: 'ASC' | 'DESC' = 'ASC',
  orderBY = 'price',
  min = 0,
  max = 1000,
): Promise<GoodProp[]> {
  return await httpGet<undefined, GoodProp[]>(
    `/good/search?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${oderRule}&orderBY=${orderBY}&min=${min}&max=${max}`,
    undefined,
  );
}
