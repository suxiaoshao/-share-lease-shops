import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useAsyncFnWithNotify } from '../../../utils/hook/useAsyncFnWithNotify';
import { sendExpress } from '../../../utils/http/order/sendExpress';

export interface OrderSendProp {
  /**
   * 是否打开对话框
   * */
  open: boolean;
  /**
   * 订单号
   * */
  oid: number;

  /**
   * 取消
   * */
  onClose(): void;

  /**
   * 更改
   * */
  onChange(): void;
}

export default function OrderSend(props: OrderSendProp): JSX.Element {
  const [express, setExpress] = React.useState<string>('');
  const [state, send] = useAsyncFnWithNotify(
    async () => {
      await sendExpress(express, props.oid);
      props.onChange();
    },
    '成功提交快递单号并确认发货',
    [express, props.oid],
  );
  return (
    <Dialog open={props.open}>
      <DialogTitle>提交快递单号</DialogTitle>
      <DialogContent>
        <TextField
          value={express}
          onChange={(event) => {
            setExpress(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color={'secondary'}
          onClick={() => {
            props.onClose();
          }}
        >
          取消
        </Button>
        <Button onClick={send} disabled={state.loading} color={'primary'}>
          确认并发送
        </Button>
      </DialogActions>
    </Dialog>
  );
}
