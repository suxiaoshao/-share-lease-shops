import React from 'react';
import { Button, DialogActions, InputAdornment, TextField } from '@material-ui/core';
import { useAccountStyle } from './userAccount';
import { login } from '../../utils/http/user/login';
import { userInfoStore } from '../../utils/store/userInfo.store';
import { Email, Lock } from '@material-ui/icons';
import { asyncFunc } from '../../utils/hook/asyncFunc';

export interface LoginProp {
  /**
   * 邮箱
   * */
  email: string;
  /**
   * 密码
   * */
  password: string;

  /**
   * 输入框修改邮箱
   * */
  onChangeEmail(newEmail: string): void;

  /**
   * 输入框修改密码
   * */
  onChangePassword(newPassword: string): void;
}

/**
 * 登陆组件
 * */
export default function Login(props: LoginProp): JSX.Element {
  const classes = useAccountStyle();
  return (
    <form className={classes.form}>
      <TextField
        className={classes.input}
        label="email"
        fullWidth
        type={'email'}
        value={props.email}
        onChange={(event) => {
          props.onChangeEmail(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label="密码"
        fullWidth
        type={'password'}
        value={props.password}
        onChange={(event) => {
          props.onChangePassword(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <DialogActions>
        <Button
          onClick={() => {
            asyncFunc(() => {
              return login(props.email, props.password);
            }, '成功登陆').then((value) => {
              userInfoStore.setData(value);
            });
          }}
          variant="contained"
          color={'primary'}
        >
          登陆
        </Button>
      </DialogActions>
    </form>
  );
}
