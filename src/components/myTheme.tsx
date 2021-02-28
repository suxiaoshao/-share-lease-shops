import React, { useMemo, useState } from 'react';
import { Button, createMuiTheme, CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { zhCN } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { SnackbarProvider } from 'notistack';
import { Notify } from './common/notify';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件的 prop
 * */
interface MyThemeProp {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件
 * */
export function MyThemeProvider(props: MyThemeProp): JSX.Element {
  /**
   * 判断在 utools 是否是黑色
   * */
  const [dark] = useState<boolean>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  /**
   * 主题对象
   * */
  const themeObject = useMemo<Theme>(() => {
    return createMuiTheme({
      palette: dark
        ? {
            type: 'dark',
            primary: {
              main: '#90caf9',
              light: '#a6d4fa',
              dark: '#648dae',
            },
            secondary: {
              main: '#f48fb1',
              light: '#f6a5c0',
              dark: '#aa647b',
            },
          }
        : undefined,
    });
  }, [dark]);
  const nonstickRef = React.useRef<SnackbarProvider>(null);

  return (
    <MuiThemeProvider theme={themeObject}>
      <CssBaseline />
      {/* 时间组件 */}
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
        {/* 消息条组件 */}
        <SnackbarProvider
          ref={nonstickRef}
          maxSnack={5}
          action={(key) => (
            <Button
              onClick={() => {
                nonstickRef.current?.closeSnackbar(key);
              }}
            >
              关闭
            </Button>
          )}
        >
          <Notify />
          <div className={dark ? 'my-dark' : 'my-light'}>{props.children}</div>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
