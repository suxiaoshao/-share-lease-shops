import React from 'react';
import MyDrawer from '../components/myDrawer';
import { getShopOrders, OrderRuleType, StatusType } from '../utils/http/order/getShopOrders';
import OrdersTab from '../components/page/orders/ordersTab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hook/useAsyncFnWithNotify';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { Loading } from '../components/common/loading';
import OrderItem from '../components/page/orders/orderItem';
import { shopStatusStore } from '../utils/store/shopStatus.store';
import { useHistory } from 'react-router';
import { useQuery } from '../utils/hook/useQuery';
import TablePaginationActions from '../components/common/myTable/tablePaginationActions';

const useClasses = makeStyles((theme) =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    tab: {
      flex: '0 0 auto',
    },
    table: {
      flex: '1 1 0',
      margin: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
      overflow: 'auto',
      maxHeight: `calc(100% - ${theme.spacing(4)}px)`,
    },
  }),
);

export default function Orders(): JSX.Element {
  /**
   * 路由切换
   * */
  const pageHistory = useHistory();
  /**
   * 标签
   * */
  const tabValue = useQuery('tab') as StatusType | null;
  /**
   * 页码
   * */
  const pageNum = Number(useQuery('pageNum') ?? 0);
  /**
   * 每页大小
   * */
  const pageSize = Number(useQuery('pageSize') ?? 10);
  /**
   * 排序规则
   * */
  const orderRule = (useQuery('orderRule') as OrderRuleType) ?? 'DESC';
  /**
   * 样式
   * */
  const classes = useClasses();
  /**
   * 数据
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      return await getShopOrders(pageNum, tabValue, pageSize, orderRule);
    },
    undefined,
    [tabValue, pageNum, pageSize, orderRule],
  );
  /**
   * 更改路由
   * */
  const changeRouter = React.useCallback(
    (tab: StatusType | null, num: number, size: number, rule: OrderRuleType) => {
      const searchUrl =
        tab !== null
          ? `?tab=${tab}&pageNum=${num}&pageSize=${size}&orderRule=${rule}`
          : `?pageNum=${num}&pageSize=${size}&orderRule=${rule}`;
      pageHistory.push({ search: searchUrl });
    },
    [pageHistory],
  );
  React.useEffect(() => {
    changeRouter(tabValue, 0, pageSize, orderRule);
  }, [changeRouter, orderRule, pageSize, tabValue]);
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return (
    <MyDrawer className={classes.main}>
      <OrdersTab
        className={classes.tab}
        tabValue={tabValue}
        setTableValue={(value) => {
          changeRouter(value, pageNum, pageSize, orderRule);
        }}
      />
      <TableContainer className={classes.table} component={Paper}>
        <Loading state={{ ...state, retry: fn }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>买家</TableCell>
                <TableCell>商品</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>价格/定金</TableCell>
                <TableCell>创建时间</TableCell>
                <TableCell>地址信息</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.value?.list.map((orderItem) => (
                <OrderItem
                  onChange={() => {
                    fn().then();
                    shopStatusStore.updateFromServer();
                  }}
                  key={orderItem.oid}
                  order={orderItem}
                />
              ))}
            </TableBody>
            <TablePagination
              count={state.value?.total ?? 0}
              onChangePage={(event, page) => {
                changeRouter(tabValue, page, pageSize, orderRule);
              }}
              page={pageNum}
              rowsPerPage={pageSize}
              onChangeRowsPerPage={(event) => {
                changeRouter(tabValue, pageNum, parseInt(event.target.value), orderRule);
              }}
              rowsPerPageOptions={[5, 10, 20]}
              ActionsComponent={TablePaginationActions}
            />
          </Table>
        </Loading>
      </TableContainer>
    </MyDrawer>
  );
}
