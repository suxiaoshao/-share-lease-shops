import React from 'react';
import { Box } from '@material-ui/core';
import { DataView } from './statistics/dataView';

/**
 * 图表
 * */
export default function StatisticsView(): JSX.Element {
  return (
    <Box>
      <DataView title={'一周数据'} type={'day'} time={7} />
      <DataView title={'一月数据'} type={'day'} time={30} />
      <DataView title={'半年数据'} type={'mouth'} time={6} />
      <DataView title={'一年数据'} type={'mouth'} time={12} />
    </Box>
  );
}
