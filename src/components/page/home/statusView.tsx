import React from 'react';
import { useStatusData } from '../../../utils/store/shopStatus.store';
import { Box, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../../../utils/hook/useAsyncFnWithNotify';
import { getMoney } from '../../../utils/http/shop/getMoney';
import { Loading } from '../../common/loading';

const useClasses = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    main: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    item: {
      width: `calc(25% - ${theme.spacing(2.25)}px)`,
    },
    itemContent: {
      textAlign: 'center',
    },
    button: {
      height: '100%',
    },
  }),
);

/**
 * 状态信息
 * */
export default function StatusView(): JSX.Element {
  const [shopStatus] = useStatusData();
  const classes = useClasses();
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      return await getMoney();
    },
    undefined,
    [],
  );
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return (
    <>
      <Typography className={classes.header} variant={'h5'}>
        概览
      </Typography>
      <Box className={classes.main}>
        <Card className={classes.item}>
          <CardActionArea className={classes.button}>
            <CardContent className={classes.itemContent}>
              <Typography variant={'h4'}>{shopStatus.payedNum}</Typography>
              <Typography color={'textSecondary'}>待发货</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.item}>
          <CardActionArea className={classes.button}>
            <CardContent className={classes.itemContent}>
              <Typography variant={'h4'}>{shopStatus.abandonNum}</Typography>
              <Typography color={'textSecondary'}>退货待处理</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.item}>
          <CardActionArea className={classes.button}>
            <CardContent className={classes.itemContent}>
              <Typography variant={'h4'}>{shopStatus.revertNum}</Typography>
              <Typography color={'textSecondary'}>租用退回待处理</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.item}>
          <Loading state={{ ...state, retry: fn }}>
            {state.value && (
              <CardContent className={classes.itemContent}>
                <Typography variant={'h4'}>{state.value}</Typography>
                <Typography color={'textSecondary'}>剩余金额</Typography>
              </CardContent>
            )}
          </Loading>
        </Card>
      </Box>
    </>
  );
}
