import React from 'react';
import MyDrawer from '../components/myDrawer';
import { Button, createStyles, DialogActions, InputAdornment, TextField } from '@material-ui/core';
import { useShopInfo } from '../utils/store/shopInfo.store';
import { makeStyles } from '@material-ui/core/styles';
import { Description, Storefront } from '@material-ui/icons';
import { updateMerchant } from '../utils/http/shop/updateMerchant';
import { asyncWithNotify } from '../utils/hook/asyncWithNotify';
import { useAsyncFn } from 'react-use';

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      flex: '1 1 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    form: {
      width: 500,
    },
    input: {
      margin: theme.spacing(1.5),
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
  }),
);

/**
 * 设置商店属性
 * */
export default function ShopSetting(): JSX.Element {
  const classes = useStyle();
  const [shopInfo, setShopInfo] = useShopInfo();
  /**
   * 新商店名
   * */
  const [name, setName] = React.useState(shopInfo?.name ?? '');
  /**
   * 新商店描述
   * */
  const [info, setInfo] = React.useState(shopInfo?.info ?? '');
  /**
   * 根据商店信息新商店信息更新
   * */
  React.useEffect(() => {
    setInfo(shopInfo?.info ?? '');
    setName(shopInfo?.name ?? '');
  }, [shopInfo]);
  /**
   * 获取状态和数据
   * */
  const [state, fetch] = useAsyncFn(async () => {
    return asyncWithNotify(() => {
      return updateMerchant(name, info);
    }, '成功更新').then(() => {
      if (shopInfo !== null) {
        setShopInfo({
          ...shopInfo,
          name,
          info,
        });
      }
    });
  }, [name, info, shopInfo]);
  return (
    <MyDrawer className={classes.main}>
      <form className={classes.form}>
        <TextField
          className={classes.input}
          label={'店名'}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                <Storefront />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.input}
          fullWidth
          label={'描述'}
          value={info}
          onChange={(event) => {
            setInfo(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                <Description />
              </InputAdornment>
            ),
          }}
        />
        <DialogActions>
          <Button variant={'contained'} color={'primary'} onClick={fetch} disabled={state.loading}>
            更新
          </Button>
        </DialogActions>
      </form>
    </MyDrawer>
  );
}
