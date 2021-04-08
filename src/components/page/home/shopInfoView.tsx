import React from 'react';
import { Avatar, Card, CardHeader } from '@material-ui/core';
import { useShopInfo } from '../../../utils/store/shopInfo.store';

export interface ShopInfoViewProp {
  /**
   * 样式类
   * */
  className: string;
}

/**
 * 商店信息展示
 * */
export default function ShopInfoView(props: ShopInfoViewProp): JSX.Element {
  const [shopInfo] = useShopInfo();
  return (
    <Card elevation={0} square className={props.className}>
      <CardHeader
        avatar={<Avatar src={'https://si.geilicdn.com/vshop-shop-logo-default.jpg'} />}
        title={shopInfo?.name}
        subheader={shopInfo?.info}
      />
    </Card>
  );
}
