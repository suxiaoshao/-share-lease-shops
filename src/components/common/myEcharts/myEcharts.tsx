import React from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';
import { darkTheme } from './dark';
import { vintage } from './vintage';

export interface MyEchartsProp {
  option: EChartsOption;
}

/**
 * 我的
 * */
export default function MyEcharts(props: MyEchartsProp): JSX.Element {
  const theme = useTheme();
  echarts.registerTheme('dark', darkTheme(theme));
  echarts.registerTheme('light', vintage(theme));
  return <ReactEcharts option={props.option} theme={theme.palette.type} />;
}
