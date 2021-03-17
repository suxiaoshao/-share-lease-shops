import React from 'react';
import { Card, CardContent, CardHeader, List, Typography } from '@material-ui/core';
import { useGoodCardStyle } from './goodDetailInfo';
import { RentInfo } from '../../utils/http/goods/getGoodDetail';
import RendItem from './renrItem';
import { updateRent } from '../../utils/http/shop/updateRent';

export interface GoodRentProp {
  /**
   * 租金信息列表
   * */
  rents: RentInfo[];
  /**
   * 货物 id
   * */
  gid: number;

  /**
   * 触发修改 rents信息
   * */
  onChangeRents(newRents: RentInfo[]): void;
}

/**
 * 租金信息
 * */
export default function GoodRent(props: GoodRentProp): JSX.Element {
  const classes = useGoodCardStyle();
  return (
    <Card className={classes.base}>
      <CardHeader title={'租金信息'} />
      {props.rents.length !== 0 ? (
        <List>
          {props.rents.map((value) => (
            <RendItem
              onDelete={async (rid) => {
                const newRents = props.rents.filter((value1) => value1.rid !== rid);
                await updateRent(newRents, props.gid);
                props.onChangeRents(newRents);
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
    </Card>
  );
}
