import React from 'react';
import MyDrawer from '../components/myDrawer';
import ShopInfoView from '../components/page/home/shopInfoView';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StatusView from '../components/page/home/statusView';
import { Box } from '@material-ui/core';

const useClass = makeStyles(() =>
  createStyles({
    main: {
      position: 'relative',
      overflow: 'auto',
    },
    header: {
      position: 'sticky',
    },
  }),
);

/**
 * 主页
 * */
export default function HomePage(): JSX.Element {
  const classes = useClass();
  return (
    <MyDrawer className={classes.main}>
      <ShopInfoView className={classes.header} />
      <Box padding={3}>
        <StatusView />
      </Box>
    </MyDrawer>
  );
}
