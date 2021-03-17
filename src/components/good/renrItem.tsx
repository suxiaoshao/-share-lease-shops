import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import dayjs from 'dayjs';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { RentInfo } from '../../utils/http/goods/getGoodDetail';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAsyncFnWithNotify } from '../../utils/hook/useAsyncFnWithNotify';

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
  return (
    <ListItem>
      <ListItemText
        primary={`${props.rent.rent}元 每 ${dayjs.duration({ seconds: props.rent.time }).humanize()}`}
        secondary={`保证金 : ${props.rent.pledge}`}
      />
      <Tooltip title={'删除'}>
        <ListItemSecondaryAction>
          <IconButton disabled={deleteState.loading} onClick={fn}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </Tooltip>
    </ListItem>
  );
}
