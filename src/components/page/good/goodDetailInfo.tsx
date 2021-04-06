import React from 'react';
import { GoodDetail } from '../../../utils/http/goods/getGoodDetail';
import {
  Avatar,
  Card,
  CardHeader,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import GoodEdit from '../goods/goodEdit';

export interface GoodInfoProp {
  /**
   * 商品详情
   * */
  goodInfo: GoodDetail;

  /**
   * 更新信息的触发器
   * */
  onUpdate(newGood: GoodDetail): void;
}

export const useGoodCardStyle = makeStyles((theme) =>
  createStyles({
    base: {
      margin: theme.spacing(1.5),
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
    image: {
      width: theme.spacing(16),
      height: theme.spacing(10),
    },
  }),
);

/**
 * 商品信息
 * */
export function GoodDetailInfo(props: GoodInfoProp): JSX.Element {
  const classes = useGoodCardStyle();
  const [editOpen, setEditOpen] = React.useState(false);
  return (
    <Card className={classes.base}>
      <CardHeader
        title={'基本信息'}
        action={
          <Tooltip title={'修改'}>
            <IconButton
              onClick={() => {
                setEditOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        }
      />
      <List>
        <ListItem>
          <ListItemIcon>商品名</ListItemIcon>
          <ListItemText>{props.goodInfo.name}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>图片</ListItemIcon>
          <ListItemAvatar>
            <Avatar className={classes.image} variant="rounded" src={props.goodInfo.picUrl} />
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemIcon>描述</ListItemIcon>
          <ListItemText>{props.goodInfo.info}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>类型</ListItemIcon>
          <ListItemText>{props.goodInfo.type}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>价格</ListItemIcon>
          <ListItemText>{props.goodInfo.price}</ListItemText>
        </ListItem>
      </List>
      <GoodEdit
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
        goodItem={props.goodInfo}
        onSave={props.onUpdate}
      />
    </Card>
  );
}
