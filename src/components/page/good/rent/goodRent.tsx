import React from 'react';
import { Card, CardContent, CardHeader, IconButton, List, Tooltip, Typography } from '@material-ui/core';
import { useGoodCardStyle } from '../goodDetailInfo';
import { RentInfo } from '../../../../utils/http/goods/getGoodDetail';
import RendItem from './renrItem';
import { UploadRent } from '../../../../utils/http/shop/updateRent';
import { Add } from '@material-ui/icons';
import EditRent from './editRent';

export interface GoodRentProp {
  /**
   * 租金信息列表
   * */
  rents: RentInfo[];

  /**
   * 触发修改 rents信息
   * */
  onChange(newRents: UploadRent[]): void;
}

/**
 * 租金信息
 * */
export default function GoodRent(props: GoodRentProp): JSX.Element {
  const classes = useGoodCardStyle();
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Card className={classes.base}>
      <CardHeader
        title={'租金信息'}
        action={
          <Tooltip title={'添加'}>
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        }
      />
      {props.rents.length !== 0 ? (
        <List>
          {props.rents.map((value) => (
            <RendItem
              onDelete={async (rid) => {
                const newRents = props.rents.filter((value1) => value1.rid !== rid);
                props.onChange(newRents);
              }}
              onChange={async (rent) => {
                const newRents = props.rents.map((value1) => {
                  if (value1.rid === rent.rid) {
                    return rent;
                  } else {
                    return value1;
                  }
                });
                props.onChange(newRents);
              }}
              rent={value}
              key={value.rid}
            />
          ))}
        </List>
      ) : (
        <CardContent>
          <Typography>暂时没有租金</Typography>
        </CardContent>
      )}
      <EditRent
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        title={'添加租金信息'}
        onChange={async (rent) => {
          const newRents = [...props.rents, rent as RentInfo];
          props.onChange(newRents);
        }}
        successMessage={'成功添加'}
      />
    </Card>
  );
}
