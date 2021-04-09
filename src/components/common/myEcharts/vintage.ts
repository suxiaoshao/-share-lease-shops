import { Theme } from '@material-ui/core';
import { ThemeOption } from 'echarts/types/src/util/types';

const colorPalette = [
  '#516b91',
  '#59c4e6',
  '#edafda',
  '#93b7e3',
  '#a5e7f0',
  '#cbb0e3',
  '#d87c7c',
  '#919e8b',
  '#d7ab82',
  '#6e7074',
  '#61a0a8',
  '#efa18d',
  '#787464',
  '#cc7e63',
  '#724e58',
  '#4b565b',
];

export const vintage = (MuiTheme: Theme): ThemeOption => {
  return {
    color: colorPalette,
    backgroundColor: MuiTheme.palette.background.paper,
    graph: {
      color: colorPalette,
    },
  };
};
