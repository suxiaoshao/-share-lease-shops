import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { useAsyncRetry } from 'react-use';
import { getStatistics, StatisticsType } from '../../../../utils/http/shop/getStatistics';
import { Loading } from '../../../common/loading';
import { EChartsOption } from 'echarts';
import MyEcharts from '../../../common/myEcharts/myEcharts';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export interface DataViewProp {
  title: string;
  time: number;
  type: StatisticsType;
}

const useClasses = makeStyles((theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(3),
    },
  }),
);

/**
 * 一周数据
 * */
export function DataView(props: DataViewProp): JSX.Element {
  const classes = useClasses();
  const state = useAsyncRetry(async () => {
    return await getStatistics(props.time, props.type);
  });
  const option = React.useMemo<EChartsOption>(() => {
    const xAxis = state.value?.map((value) => value.date) ?? [];
    const money = state.value?.map((value) => value.money / 100);
    const orderNum = state.value?.map((value) => value.num);
    return {
      xAxis: {
        type: 'category',
        data: xAxis,
      },
      legend: {
        data: ['金额(百元)', '订单数'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: money,
          name: '金额(百元)',
        },
        {
          type: 'line',
          smooth: true,
          data: orderNum,
          name: '订单数',
        },
      ],
    };
  }, [state]);
  return (
    <Card className={classes.main}>
      <CardHeader title={props.title} />
      <CardContent>
        <Loading state={state}>
          <MyEcharts option={option} />
        </Loading>
      </CardContent>
    </Card>
  );
}
