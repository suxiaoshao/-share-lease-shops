import React from 'react';
import { Button, TableCell } from '@material-ui/core';
import { StatusType } from '../../../utils/http/order/shopOrders';
import { getLabelFromStatus } from '../../../utils/getLabelFromStatus';
import OrderSend from './orderSend';
import { useAsyncFnWithNotify } from '../../../utils/hook/useAsyncFnWithNotify';
import { confirmedReturn } from '../../../utils/http/order/confirmedReturn';
import { confirmationMail } from '../../../utils/http/order/confirmationMail';

export interface OrderActionProp {
  /**
   * 订单状态
   * */
  orderStatus: StatusType;
  /**
   * 订单号
   * */
  oid: number;

  /**
   * 改变时
   * */
  onChange(): void;
}

/**
 * 订单的操作
 * */
export default function OrderAction(props: OrderActionProp): JSX.Element {
  /**
   * 发货窗口是否打开
   * */
  const [open, setOpen] = React.useState<boolean>(false);
  /**
   * 确认用户退货
   * */
  const [returnState, confirmedReturnFn] = useAsyncFnWithNotify(
    async () => {
      await confirmedReturn(props.oid);
      props.onChange();
    },
    '确认成功',
    [props.oid],
  );
  /**
   * 确认寄回
   * */
  const [onMailState, confirmedOnMailFn] = useAsyncFnWithNotify(
    async () => {
      await confirmationMail(props.oid);
      props.onChange();
    },
    '确认成功',
    [props.oid],
  );
  switch (props.orderStatus) {
    case 'abandon':
      return (
        <TableCell padding={'none'}>
          <Button disabled={returnState.loading} onClick={confirmedReturnFn} color={'primary'}>
            确认用户退货
          </Button>
        </TableCell>
      );
    case 'payed':
      return (
        <>
          <TableCell>
            <Button
              color={'primary'}
              onClick={() => {
                setOpen(true);
              }}
            >
              商家发货
            </Button>
          </TableCell>
          <OrderSend
            open={open}
            oid={props.oid}
            onClose={() => {
              setOpen(false);
            }}
            onChange={() => {
              setOpen(false);
              props.onChange();
            }}
          />
        </>
      );
    case 'revert':
      return (
        <TableCell padding={'none'}>
          <Button color={'primary'} disabled={onMailState.loading} onClick={confirmedOnMailFn}>
            确认用户租用退回
          </Button>
        </TableCell>
      );
  }
  return <TableCell>{getLabelFromStatus(props.orderStatus)}</TableCell>;
}
