import { Store } from './store';
import { UserDetail } from '../http/user/getInfo';
import { shopInfoStore } from './shopInfo.store';
import { shopStatusStore } from './shopStatus.store';

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

/**
 * 用户信息实例
 * */
export const userInfoStore = new UserInfoStore();

/**
 * 用户是否登录的 hook 函数
 * */
export const useIsLogin = userInfoStore.getComputeFunc(
  (data) => data !== null,
  (newComputeData, preData) => preData,
);

/**
 * 注入监听时间当 userInfo 改变时 更新 shopInfo
 * */
userInfoStore.addListen((newValue) => {
  if (newValue !== null) {
    shopInfoStore.updateFromServer();
    shopStatusStore.updateFromServer();
  } else {
    shopInfoStore.initData();
    shopStatusStore.initData();
  }
});

/**
 * 从本地数据库中读取 userInfo 信息
 * */
const userInfo = window.localStorage.getItem('userInfo');
if (userInfo !== null) {
  userInfoStore.setData(JSON.parse(userInfo));
}
