import React from 'react';
import { useAccountStyle } from './userAccount';
import { Button, DialogActions, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { AccountCircle, Dialpad, Email, Lock, Send } from '@material-ui/icons';
import { register } from '../../utils/http/user/register';
import { sendMailCode } from '../../utils/http/user/sendMailCode';
import { useAsyncFnWithNotify } from '../../utils/hook/useAsyncFnWithNotify';

export interface RegisterProp {
  /**
   * 注册成功
   * @param newPassword 新密码
   * @param newEmail 新邮箱
   * */
  onSuccess(newEmail: string, newPassword: string): void;
}

export default function Register(props: RegisterProp): JSX.Element {
  const classes = useAccountStyle();
  /**
   * 邮箱
   * */
  const [email, setEmail] = React.useState<string>('');
  /**
   * 密码
   * */
  const [password, setPassword] = React.useState<string>('');
  /**
   * 用户名
   * */
  const [name, setName] = React.useState<string>('');
  /**
   * 验证码
   * */
  const [code, setCode] = React.useState<string>('');
  /**
   * 获取注册验证码
   * */
  const [codeState, sendCode] = useAsyncFnWithNotify(
    async () => {
      await sendMailCode(email);
    },
    '成功发送验证码',
    [email],
  );
  /**
   * 注册
   * */
  const [registerState, registerFn] = useAsyncFnWithNotify(
    async () => {
      await register(name, password, email, code);
      props.onSuccess(email, password);
    },
    '成功注册',
    [name, password, email, code],
  );
  return (
    <form className={classes.form}>
      <TextField
        className={classes.input}
        label={'用户名'}
        fullWidth
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label="email"
        fullWidth
        type={'email'}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={'end'}>
              <Tooltip title={'发送验证码'}>
                <IconButton disabled={codeState.loading} onClick={sendCode}>
                  <Send />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label={'验证码'}
        value={code}
        fullWidth
        onChange={(event) => {
          setCode(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Dialpad />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label="密码"
        fullWidth
        type={'password'}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
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
        <Button disabled={registerState.loading} onClick={registerFn} variant="contained" color={'primary'}>
          注册
        </Button>
      </DialogActions>
    </form>
  );
}
