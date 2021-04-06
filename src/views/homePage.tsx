import React from 'react';
import MyDrawer from '../components/myDrawer';
import ShopInfoView from '../components/page/home/shopInfoView';

/**
 * 主页
 * */
export default function HomePage(): JSX.Element {
  return (
    <MyDrawer>
      <ShopInfoView />
    </MyDrawer>
  );
}
