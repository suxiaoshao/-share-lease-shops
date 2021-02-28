import { Store } from './store';
import { UserInfo } from '../http/user/getInfo';
import { getMerchantMyself } from '../http/shop/getMerchantMyself';
import { shopInfoStore } from './shopInfo.store';
import { notifySubject } from '../../components/common/notify';

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
  getMerchantMyself()
    .then((value) => {
      shopInfoStore.setData(value);
      notifySubject.next({
        message: '成功获取商店信息',
        options: { variant: 'success' },
      });
    })
    .catch((err: Error) => {
      notifySubject.next({
        message: err.message,
        options: {
          variant: 'error',
        },
      });
    });
});
