import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { GoodProp } from '../../utils/http/good/goodList';
import { useFormStyle } from '../../utils/hook/useFornStyle';

interface GoodEditProp {
  /**
   * 修改对话框是否打开
   * */
  open: boolean;

  /**
   * 关闭修改框
   * */
  onClose(): void;

  /**
   * 商品信息
   * */
  goodItem: GoodProp;
}

export default function GoodEdit(props: GoodEditProp): JSX.Element {
  const classes = useFormStyle();
  /**
   * 新商品名字
   * */
  const [newName, setNewName] = React.useState(props.goodItem.name);
  /**
   * 新描述
   * */
  const [newInfo, setNewInfo] = React.useState(props.goodItem.info);
  return (
    <Dialog maxWidth={'md'} open={props.open} onClose={props.onClose}>
      <DialogTitle>修改商品信息</DialogTitle>
      <DialogContent>
        <DialogContentText>修改</DialogContentText>
        <TextField
          label={'商品名'}
          fullWidth
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          className={classes.input}
        />
        <TextField
          label={'商品描述'}
          fullWidth
          value={newInfo}
          onChange={(event) => {
            setNewInfo(event.target.value);
          }}
          className={classes.input}
        />
      </DialogContent>
    </Dialog>
  );
}
