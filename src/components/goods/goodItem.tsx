import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { GoodProp } from '../../utils/http/good/goodList';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Money, Payment } from '@material-ui/icons';
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
      '& @media screen and (max-width: 1260px)': {
        width: `calc(100% / 2 - ${theme.spacing(3)}px)`,
      },
      '@media screen and (max-width: 1440px)': {
        width: `calc(100% / 3 - ${theme.spacing(3)}px)`,
      },
    },
  }),
);

export default function GoodItem(props: GoodItemProp): JSX.Element {
  const classes = useStyle();
  const [editOpen, setEditOpen] = React.useState(false);
  return (
    <Card className={classes.main}>
      <CardHeader
        avatar={<Avatar src={props.goodItem.picUrl} />}
        title={props.goodItem.name}
        subheader={props.goodItem.info}
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
          <ListItemIcon>
            <Money />
          </ListItemIcon>
          <ListItemText primary={'价格'} secondary={props.goodItem.price} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Payment />
          </ListItemIcon>
          <ListItemText primary={'租金'} secondary={props.goodItem.rent} />
        </ListItem>
      </List>
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
