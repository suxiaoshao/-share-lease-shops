import React from 'react';
import { useAccountStyle } from './userAccount';
import { Button, DialogActions, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { AccountCircle, Dialpad, Email, Lock, Send } from '@material-ui/icons';
import { register } from '../../utils/http/user/register';
import { useSnackbar } from 'notistack';
import { sendMailCode } from '../../utils/http/user/sendMailCode';

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
  const { enqueueSnackbar } = useSnackbar();
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
                <IconButton
                  onClick={() => {
                    sendMailCode(email)
                      .then(() => {
                        enqueueSnackbar('成功发送验证码', {
                          variant: 'success',
                        });
                      })
                      .catch((err: Error) => {
                        enqueueSnackbar(err.message, { variant: 'error' });
                      });
                  }}
                >
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
        <Button
          onClick={() => {
            register(name, password, email, code)
              .then(() => {
                props.onSuccess(email, password);
                enqueueSnackbar('成功注册', { variant: 'success' });
              })
              .catch((err: Error) => {
                enqueueSnackbar(err.message, { variant: 'error' });
              });
          }}
          variant="contained"
          color={'primary'}
        >
          注册
        </Button>
      </DialogActions>
    </form>
  );
}
