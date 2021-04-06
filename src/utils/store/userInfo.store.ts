import { Store } from './store';
import { UserDetail } from '../http/user/getInfo';
import { getMerchantMyself } from '../http/shop/getMerchantMyself';
import { shopInfoStore } from './shopInfo.store';
import { asyncWithNotify } from '../hook/asyncWithNotify';

/**
 * 全局用户信息
 * */
export class UserInfoStore extends Store<UserDetail | null> {
  constructor() {
    super(null);
  }

  public setData(newData: UserDetail | null): void {
    if (newData === null) {
      window.localStorage.removeItem('userInfo');
    } else {
      window.localStorage.setItem('userInfo', JSON.stringify(newData));
    }
    super.setData(newData);
  }
}

export const userInfoStore = new UserInfoStore();

export const useUserInfo = userInfoStore.getDataFunc();

export const useIsLogin = userInfoStore.getComputeFunc(
  (data) => data !== null,
  (newComputeData, preData) => preData,
);

/**
 * 注入监听时间当 userInfo 改变时 更新 shopInfo
 * */
userInfoStore.addListen((newValue) => {
  if (newValue !== null) {
    asyncWithNotify(getMerchantMyself, '成功获取商店信息').then((value) => {
      shopInfoStore.setData(value);
    });
  } else {
    shopInfoStore.setData(null);
  }
});

/**
 * 从本地数据库中读取 userInfo 信息
 * */
const userInfo = window.localStorage.getItem('userInfo');
if (userInfo !== null) {
  userInfoStore.setData(JSON.parse(userInfo));
}
