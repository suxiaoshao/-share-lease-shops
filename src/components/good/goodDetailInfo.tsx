import React from 'react';
import { GoodDetail } from '../../utils/http/goods/getGoodDetail';
import {
  Card,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import GoodEdit from '../goods/goodEdit';
import { useForceUpdate } from '../../utils/hook/useForceUpdate';

export interface GoodInfoProp {
  /**
   * 商品详情
   * */
  goodInfo: GoodDetail;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    base: {
      margin: theme.spacing(1.5),
    },
    list: {
      display: 'flex',
    },
    listName: {
      flex: '1 1 0',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
);

/**
 * 商品信息
 * */
export function GoodDetailInfo(props: GoodInfoProp): JSX.Element {
  const classes = useStyle();
  const [editOpen, setEditOpen] = React.useState(false);
  const forceUpdate = useForceUpdate();
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
      <CardMedia image={props.goodInfo.picUrl} className={classes.media} />
      <List>
        <ListItem>
          <ListItemIcon>商品名</ListItemIcon>
          <ListItemText>{props.goodInfo.name}</ListItemText>
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
        onSave={(newValue) => {
          props.goodInfo.info = newValue.info;
          props.goodInfo.name = newValue.name;
          props.goodInfo.picUrl = newValue.picUrl;
          props.goodInfo.type = newValue.type;
          props.goodInfo.price = newValue.price;
          forceUpdate();
        }}
      />
    </Card>
  );
}
