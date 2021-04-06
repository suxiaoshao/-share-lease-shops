import React from 'react';
import MyDrawer from '../components/myDrawer';
import { useLocation } from 'react-router';
import { getGoodDetail } from '../utils/http/goods/getGoodDetail';
import { useAsyncRetry } from 'react-use';
import { Loading } from '../components/common/loading';
import { GoodDetailInfo } from '../components/page/good/goodDetailInfo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GoodRent from '../components/page/good/rent/goodRent';
import { updateRent } from '../utils/http/shop/updateRent';

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
  /**
   * 这个商品 id
   * */
  const gid = React.useMemo(() => {
    return parseInt(myLocation.pathname.match(/\/good\/(?<gid>\d+)/)?.groups?.['gid'] ?? '-1');
  }, [myLocation.pathname]);
  /**
   * 数据
   * */
  const state = useAsyncRetry(async () => {
    return await getGoodDetail(gid);
  }, [gid]);
  const classes = useStyle();
  const [goodInfo, setGoodInfo] = React.useState(state.value);
  React.useEffect(() => {
    setGoodInfo(state.value);
  }, [state.value]);
  return (
    <MyDrawer className={classes.main}>
      <Loading state={state}>
        {goodInfo !== undefined ? (
          <>
            <GoodDetailInfo onUpdate={setGoodInfo} goodInfo={goodInfo} />
            <GoodRent
              onChange={async (newRents) => {
                const newGood = await updateRent(newRents, goodInfo.gid);
                setGoodInfo(newGood);
              }}
              rents={goodInfo.rents}
            />
          </>
        ) : undefined}
      </Loading>
    </MyDrawer>
  );
}
