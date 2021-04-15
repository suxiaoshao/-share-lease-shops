import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, TableCell, TableRow } from '@material-ui/core';
import dayjs from 'dayjs';
import { OrderDetail } from '../../../utils/http/order/shopOrders';
import Logo from '../../../assets/logo2.png';
import OrderAction from './orderAction';

export interface OrderItemProp {
  /**
   * 订单的信息
   * */
  order: OrderDetail;

  /**
   * 改变时
   * */
  onChange(): void;
}

/**
 * 订单项
 * */
export default function OrderItem(props: OrderItemProp): JSX.Element {
  return (
    <TableRow>
      <TableCell padding={'none'}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={props.order.user.avatar ?? Logo} />
          </ListItemAvatar>
          <ListItemText primary={props.order.user.username} secondary={props.order.user.email} />
        </ListItem>
      </TableCell>
      <TableCell padding={'none'}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={props.order.good?.picUrl} />
          </ListItemAvatar>
          <ListItemText primary={props.order.good?.name} secondary={`x${props.order.num}`} />
        </ListItem>
      </TableCell>
      <OrderAction onChange={props.onChange} orderStatus={props.order.status} oid={props.order.oid} />
      <TableCell>
        {props.order.money} / {props.order.pledge <= 0 ? '无' : props.order.pledge}
      </TableCell>
      <TableCell>{dayjs(props.order.createTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
      <TableCell padding={'none'}>
        <ListItem>
          <ListItemText primary={props.order.name} secondary={`${props.order.address} ${props.order.phone}`} />
        </ListItem>
      </TableCell>
    </TableRow>
  );
}
