import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { GoodProp } from '../../../utils/http/goods/goodList';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router';
import GoodEdit from './goodEdit';

export interface GoodItemProp {
  goodItem: GoodProp;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      height: 'auto',
      margin: theme.spacing(1.5),
      width: `calc(100% / 4 - ${theme.spacing(3)}px)`,
      '@media screen and (max-width: 1440px)': {
        width: `calc(100% / 3 - ${theme.spacing(3)}px)`,
      },
      '@media screen and (max-width: 1160px)': {
        width: `calc(100% / 2 - ${theme.spacing(3)}px)`,
      },
      '@media screen and (max-width: 850px)': {
        width: `calc(100% - ${theme.spacing(3)}px)`,
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    rent: {
      marginLeft: theme.spacing(2),
    },
  }),
);

export default function GoodItem(props: GoodItemProp): JSX.Element {
  const classes = useStyle();
  const [editOpen, setEditOpen] = React.useState(false);
  const myHistory = useHistory();
  return (
    <Card className={classes.main}>
      <CardHeader
        avatar={<Avatar src={props.goodItem.picUrl} />}
        title={props.goodItem.name}
        subheader={props.goodItem.type}
        action={
          <>
            <Tooltip title={'修改'}>
              <IconButton
                onClick={() => {
                  setEditOpen(true);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title={'前往详情页'}>
              <IconButton
                onClick={() => {
                  myHistory.push({ pathname: `/good/${props.goodItem.gid}` });
                }}
              >
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <CardMedia className={classes.media} image={props.goodItem.picUrl} />
      <CardContent>
        <Typography variant="body1" component="p">
          {props.goodItem.info}
        </Typography>
        <Typography variant={'body1'} color={'textSecondary'} component={'p'}>
          <span>价格 • {props.goodItem.price}</span>
          {props.goodItem.rent <= 0 || <span className={classes.rent}>租金 • {props.goodItem.rent}</span>}
        </Typography>
      </CardContent>
      <GoodEdit
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
        goodItem={props.goodItem}
      />
    </Card>
  );
}
