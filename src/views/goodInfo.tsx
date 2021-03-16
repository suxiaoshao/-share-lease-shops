import React from 'react';
import MyDrawer from '../components/myDrawer';
import { useLocation } from 'react-router';
import { getGoodDetail } from '../utils/http/goods/getGoodDetail';
import { useAsyncRetry } from 'react-use';
import { Loading } from '../components/common/loading';
import { GoodDetailInfo } from '../components/good/goodDetailInfo';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      overflow: 'auto',
    },
  }),
);

/**
 * 商品详情页面
 * */
export default function GoodInfo(): JSX.Element {
  const myLocation = useLocation();
  const gid = React.useMemo(() => {
    return parseInt(myLocation.pathname.match(/\/good\/(?<gid>\d+)/)?.groups?.['gid'] ?? '-1');
  }, [myLocation.pathname]);
  const state = useAsyncRetry(async () => {
    return await getGoodDetail(gid);
  }, [gid]);
  const classes = useStyle();
  return (
    <MyDrawer className={classes.main}>
      <Loading errorChildren={state.error?.message} state={state}>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <GoodDetailInfo goodInfo={state.value!} />
      </Loading>
    </MyDrawer>
  );
}
