import React from 'react';
import { Button, DialogActions, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { Dialpad, Email, Lock, Send } from '@material-ui/icons';
import { useAccountStyle } from './userAccount';
import { resetPassword } from '../../utils/http/user/resetPassword';
import { useSnackbar } from 'notistack';
import { resetPwdMail } from '../../utils/http/user/resetPwdMail';

export interface ForgetProp {
  /**
   * 成功重置密码的
   * @param newEmail 邮箱
   * @param newPassword 新密码
   * */
  onSuccess(newEmail: string, newPassword: string): void;
}

export function Forget(props: ForgetProp): JSX.Element {
  const classes = useAccountStyle();
  /**
   * 新密码
   * */
  const [password, setPassword] = React.useState<string>('');
  /**
   * 邮箱
   * */
  const [email, setEmail] = React.useState<string>('');
  /**
   * 验证码
   * */
  const [code, setCode] = React.useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  return (
    <form className={classes.form}>
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
                    resetPwdMail(email)
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
        label="新密码"
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
            resetPassword(email, password, code)
              .then(() => {
                props.onSuccess(email, password);
                enqueueSnackbar('成功重置密码', { variant: 'success' });
              })
              .catch((err: Error) => {
                enqueueSnackbar(err.message, { variant: 'error' });
              });
          }}
          variant="contained"
          color={'primary'}
        >
          重置密码
        </Button>
      </DialogActions>
    </form>
  );
}
