import React from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { StatusType } from '../../../utils/http/order/shopOrders';

export interface OrdersTabProp {
  /**
   * 标签分类
   * */
  tabValue: StatusType | null;

  /**
   * 标签改变
   * */
  setTableValue(value: StatusType | null): void;

  /**
   * dom 类名
   * */
  className: string;
}

export default function OrdersTab(props: OrdersTabProp): JSX.Element {
  return (
    <Paper className={props.className} square>
      <Tabs
        value={props.tabValue}
        onChange={(event, value: StatusType | null) => {
          props.setTableValue(value);
        }}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab value={null} label={'全部'} />
        <Tab value={'create'} label={'新创建订单'} />
        <Tab value={'paying'} label={'用户付款中'} />
        <Tab value={'overtime'} label={'用户付款超时'} />
        <Tab value={'payed'} label={'待商家发货'} />
        <Tab value={'expressing'} label={'商家已发货'} />
        <Tab value={'waiting'} label={'用户收货待处理'} />
        <Tab value={'abandon'} label={'用户退货待商家确认收货'} />
        <Tab value={'finish'} label={'已完成'} />
        <Tab value={'abandoned'} label={'退货已完成'} />
        <Tab value={'expressed'} label={'用户租用中'} />
        <Tab value={'expired'} label={'用户租用超时'} />
        <Tab value={'revert'} label={'用户租用退回待商家确认收货'} />
      </Tabs>
    </Paper>
  );
}
