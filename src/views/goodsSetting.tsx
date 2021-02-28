import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }),
);

/**
 * 商品设置
 * */
export default function GoodSetting(): JSX.Element {
  const classes = useStyle();
  return <MyDrawer className={classes.main}>商品设置</MyDrawer>;
}
