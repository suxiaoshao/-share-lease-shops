import axios, { AxiosError, AxiosResponse } from 'axios';
import { userInfoStore } from '../store/userInfo.store';

export const baseUrl = 'http://software.remotehost.icu';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

export interface HttpSuccessData<T> {
  status: 0;
  message: string;
  data: T;
}

export interface HttpErrorData {
  status: 1001 | 1002;
  message: string;
}

/**
 * 添加 token
 * */
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = userInfoStore.getData()?.accessToken;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export type HttpData<T> = HttpSuccessData<T> | HttpErrorData;

export async function httpBase<Req, Res>(method: 'get' | 'post' | 'put', url: string, data: Req): Promise<Res> {
  const resData: AxiosResponse<HttpData<Res>> = (await axios({
    method,
    data,
    url,
  }).catch((err: AxiosError<HttpData<Res>>) => {
    console.log(err);
    /**
     * axios 获取到值,不是因为网络因素引起的
     * */
    if (err.response) {
      /**
       * 如果是 token 过期,删除用户信息
       * */
      if (err.response.data.status === 1002) {
        userInfoStore.setData(null);
        throw new Error('登陆过期');
      }
      throw new Error(err.response.data.message);
    }
    throw new Error('网络错误');
  })) as AxiosResponse<HttpData<Res>>;
  if (resData.data.status === 0) {
    return resData.data.data;
  }
  /**
   * 如果是 token 过期,删除用户信息
   * */
  if (resData.data.status === 1002) {
    userInfoStore.setData(null);
  }
  throw new Error(resData.data.message);
}

export async function httpGet<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('get', url, data);
}

export async function httpPost<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('post', url, data);
}

export async function httpPut<Req, Res>(url: string, data: Req): Promise<Res> {
  return await httpBase<Req, Res>('put', url, data);
}
