import React from 'react';
import { Avatar, Card, CardHeader } from '@material-ui/core';
import { useShopInfo } from '../../../utils/store/shopInfo.store';

/**
 * 商店信息展示
 * */
export default function ShopInfoView(): JSX.Element {
  const [shopInfo] = useShopInfo();
  return (
    <Card elevation={0} square>
      <CardHeader
        avatar={<Avatar src={'https://si.geilicdn.com/vshop-shop-logo-default.jpg'} />}
        title={shopInfo?.name}
        subheader={shopInfo?.info}
      />
    </Card>
  );
}
