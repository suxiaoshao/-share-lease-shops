import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useShopGoods } from '../utils/store/shopInfo.store';
import GoodItem from '../components/page/goods/goodItem';
import { List } from '@material-ui/core';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
);

/**
 * 商品设置
 * */
export default function GoodSetting(): JSX.Element {
  const classes = useStyle();
  const [shopGoods] = useShopGoods();
  return (
    <MyDrawer>
      <List className={classes.main}>
        {shopGoods.map((value) => (
          <GoodItem key={value.gid} goodItem={value} />
        ))}
      </List>
    </MyDrawer>
  );
}
