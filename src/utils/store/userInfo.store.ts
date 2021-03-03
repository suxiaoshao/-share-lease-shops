import { Store } from './store';
import { UserInfo } from '../http/user/getInfo';
import { getMerchantMyself } from '../http/shop/getMerchantMyself';
import { shopInfoStore } from './shopInfo.store';
import { asyncFunc } from '../hook/asyncFunc';

/**
 * 全局用户信息
 * */
export class UserInfoStore extends Store<UserInfo | null> {
  constructor() {
    super(null);
  }
}

export const userInfoStore = new UserInfoStore();

export const useUserInfo = userInfoStore.getDataFunc();

export const useIsLogin = userInfoStore.getComputeFunc((data) => data !== null);

/**
 * 注入监听时间当 userInfo 改变时 更新 shopInfo
 * */

userInfoStore.addListen(() => {
  asyncFunc(getMerchantMyself, '成功获取商店信息').then((value) => {
    shopInfoStore.setData(value);
  });
});
