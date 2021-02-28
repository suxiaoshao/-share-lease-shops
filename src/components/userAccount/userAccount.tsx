import React from 'react';
import { AppBar, createStyles, Dialog, Tab, Tabs } from '@material-ui/core';
import { useIsLogin } from '../../utils/store/userInfo.store';
import { makeStyles } from '@material-ui/core/styles';
import { TabPanelDisappear } from '../common/tabPanel';
import Login from './login';
import Register from './register';
import { Forget } from './forget';

export const useAccountStyle = makeStyles((theme) =>
  createStyles({
    page: {
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: '1 1 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    appBar: {
      position: 'relative',
    },
    form: {
      maxWidth: '100%',
      width: 300,
      position: 'relative',
    },
    input: {
      margin: theme.spacing(1.5),
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
  }),
);

/**
 * 用户登陆
 * */
export default function UserAccount(): JSX.Element {
  const [isLogin] = useIsLogin();
  const classes = useAccountStyle();
  const [value, setValue] = React.useState<'login' | 'register' | 'forget'>('login');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  return (
    <Dialog fullScreen open={!isLogin} className={classes.page}>
      <AppBar color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          variant="fullWidth"
        >
          <Tab label={'登陆'} value={'login'} />
          <Tab label={'注册'} value={'register'} />
          <Tab label={'忘记密码'} value={'forget'} />
        </Tabs>
      </AppBar>
      <TabPanelDisappear index={'login'} value={value} className={classes.main}>
        <Login email={email} password={password} onChangeEmail={setEmail} onChangePassword={setPassword} />
      </TabPanelDisappear>
      <TabPanelDisappear index={'register'} value={value} className={classes.main}>
        <Register
          onSuccess={(newEmail, newPassword) => {
            setEmail(newEmail);
            setPassword(newPassword);
            setValue('login');
          }}
        />
      </TabPanelDisappear>
      <TabPanelDisappear index={'forget'} value={value} className={classes.main}>
        <Forget
          onSuccess={(newEmail, newPassword) => {
            setEmail(newEmail);
            setPassword(newPassword);
            setValue('login');
          }}
        />
      </TabPanelDisappear>
    </Dialog>
  );
}
