import React from 'react';
import {
  ArrowDropDown,
  ArrowDropUp,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons';
import { createStyles, IconButton, Theme, Tooltip, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '../../../utils/hook/useQuery';
import { useHistory } from 'react-router';
import { OrderRuleType } from '../../../utils/http/order/getShopOrders';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  /**
   * 总数
   * */
  count: number;
  /**
   * 当前页码
   * */
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

/**
 * 重写表格分页按钮
 * */
export default function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  /**
   * 路由切换
   * */
  const pageHistory = useHistory();
  /**
   * 排序规则
   * */
  const orderRule = (useQuery('orderRule') as OrderRuleType) ?? 'DESC';
  /**
   * 更改路由
   * */
  const changeRouter = React.useCallback(() => {
    const searchUrl = `?orderRule=${orderRule === 'ASC' ? 'DESC' : 'ASC'}`;
    pageHistory.push({ search: searchUrl });
  }, [orderRule, pageHistory]);

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <Tooltip title={orderRule === 'DESC' ? '倒序' : '正序'}>
        <IconButton onClick={changeRouter}>{orderRule === 'DESC' ? <ArrowDropUp /> : <ArrowDropDown />}</IconButton>
      </Tooltip>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}
