import React from 'react';
import MyDrawer from '../components/myDrawer';
import { useLocation } from 'react-router';
import { getGoodDetail } from '../utils/http/goods/getGoodDetail';
import { useAsyncRetry } from 'react-use';
import { Loading } from '../components/common/loading';
import { GoodDetailInfo } from '../components/good/goodDetailInfo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GoodRent from '../components/good/rent/goodRent';
import { useForceUpdate } from '../utils/hook/useForceUpdate';

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
  const forceUpdate = useForceUpdate();
  return (
    <MyDrawer className={classes.main}>
      <Loading errorChildren={state.error?.message} state={state}>
        {state.value !== undefined ? (
          <>
            <GoodDetailInfo goodInfo={state.value} />
            <GoodRent
              onChangeRents={(newRents) => {
                if (state.value) {
                  state.value.rents = newRents;
                  forceUpdate();
                }
              }}
              rents={state.value.rents}
              gid={state.value.gid}
            />
          </>
        ) : undefined}
      </Loading>
    </MyDrawer>
  );
}
