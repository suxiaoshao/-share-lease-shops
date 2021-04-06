import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import dayjs from 'dayjs';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { RentInfo } from '../../../../utils/http/goods/getGoodDetail';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAsyncFnWithNotify } from '../../../../utils/hook/useAsyncFnWithNotify';
import EditRent from './editRent';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export interface RentItemProp {
  /**
   * 数据
   * */
  rent: RentInfo;

  /**
   * 删除
   * */
  onDelete(rid: number): Promise<void>;

  /**
   * 修改
   * */
  onChange(rent: RentInfo): Promise<void>;
}

/**
 * 每一个 rent item
 * */
export default function RendItem(props: RentItemProp): JSX.Element {
  const [deleteState, fn] = useAsyncFnWithNotify(
    async () => {
      return await props.onDelete(props.rent.rid);
    },
    '成功删除',
    [props.rent.rid, props.onDelete],
  );
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <ListItem>
      <ListItemText
        primary={`${props.rent.rent}元 每 ${dayjs.duration({ seconds: props.rent.time }).humanize()}`}
        secondary={`保证金 : ${props.rent.pledge}元`}
      />
      <ListItemSecondaryAction>
        <Tooltip title={'删除'}>
          <IconButton disabled={deleteState.loading} onClick={fn}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title={'修改'}>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
      <EditRent
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        title={'修改租金信息'}
        rent={props.rent}
        onChange={props.onChange}
        successMessage={'成功修改'}
      />
    </ListItem>
  );
}
