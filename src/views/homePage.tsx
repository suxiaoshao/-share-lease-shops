import React from 'react';
import MyDrawer from '../components/myDrawer';
import ShopInfoView from '../components/page/home/shopInfoView';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import StatusView from '../components/page/home/statusView';
import { Box } from '@material-ui/core';
import StatisticsView from '../components/page/home/StatisticsView';

const useClass = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      flex: '0 0 auto',
    },
    content: {
      flex: '1 1 0',
      overflow: 'auto',
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
      <Box padding={3} className={classes.content}>
        <StatusView />
        <StatisticsView />
      </Box>
    </MyDrawer>
  );
}
