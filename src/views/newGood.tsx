import React from 'react';
import MyDrawer from '../components/myDrawer';
import NewGoodDetail from '../components/newGood/newGoodDetail';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { addGood, UploadGood } from '../utils/http/shop/addGood';
import defaultImage from '../assets/defautGood.png';
import GoodRent from '../components/good/rent/goodRent';
import { RentInfo } from '../utils/http/goods/getGoodDetail';
import { Button } from '@material-ui/core';
import { useAsyncFnWithNotify } from '../utils/hook/useAsyncFnWithNotify';
import { shopInfoStore } from '../utils/store/shopInfo.store';
import { useHistory } from 'react-router';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);
/**
 * 新商品
 * */
export default function NewGood(): JSX.Element {
  const [newGood, setNewGood] = React.useState<UploadGood>({
    name: '名字',
    info: '描述',
    type: '电子器件',
    picUrl: defaultImage,
    price: 0,
    rents: [],
  });
  const [rid, setRid] = React.useState<number>(1);
  const rents = React.useMemo<RentInfo[]>(() => {
    let newRid = rid;
    return newGood.rents.map<RentInfo>((value) => {
      const rent: RentInfo = {
        ...value,
        gid: -1,
        rid: newRid++,
      };
      setRid(newRid);
      return rent;
    });
  }, [newGood.rents]);
  const classes = useStyle();
  const myHistory = useHistory();
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      const resultGood = await addGood(newGood);
      shopInfoStore.updateGood(resultGood);
      myHistory.push({ pathname: `/good/${resultGood.gid}` });
    },
    '新建商品成功',
    [newGood],
  );
  return (
    <MyDrawer className={classes.main}>
      <NewGoodDetail newGood={newGood} onChange={setNewGood} />
      <GoodRent
        rents={rents}
        onChange={(newRents) => {
          setNewGood({
            ...newGood,
            rents: newRents,
          });
        }}
      />
      <Button disabled={state.loading} onClick={fn} variant="contained" size="large" color="primary">
        上传
      </Button>
    </MyDrawer>
  );
}
