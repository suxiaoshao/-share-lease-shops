import React from 'react';
import MyDrawer from '../components/myDrawer';
import { getShopOrders, StatusType } from '../utils/http/order/shopOrders';
import OrdersTab from '../components/page/orders/ordersTab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hook/useAsyncFnWithNotify';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
import { getLabelFromStatus } from '../utils/getLabelFromStatus';
import dayjs from 'dayjs';

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
   * 标签
   * */
  const [tabValue, setTabValue] = React.useState<StatusType | null>(null);
  /**
   * 页码
   * */
  const [pageNum, setPageNum] = React.useState<number>(0);
  /**
   * 每页大小
   * */
  const [pageSize, setPageSize] = React.useState<number>(10);
  const classes = useClasses();
  /**
   * 数据
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      return await getShopOrders(pageNum, tabValue, pageSize);
    },
    undefined,
    [tabValue, pageNum, pageSize],
  );
  React.useEffect(() => {
    setPageNum(0);
  }, [tabValue]);
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return (
    <MyDrawer className={classes.main}>
      <OrdersTab className={classes.tab} tabValue={tabValue} setTableValue={setTabValue} />
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
                <TableRow
                  key={orderItem.oid}
                  onClick={() => {
                    console.log(orderItem);
                  }}
                >
                  <TableCell padding={'none'}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={orderItem.user.avatar ?? ''} />
                      </ListItemAvatar>
                      <ListItemText primary={orderItem.user.username} secondary={orderItem.user.email} />
                    </ListItem>
                  </TableCell>
                  <TableCell padding={'none'}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={orderItem.good.picUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={orderItem.good.name} secondary={`x${orderItem.num}`} />
                    </ListItem>
                  </TableCell>
                  <TableCell>{getLabelFromStatus(orderItem.status)}</TableCell>
                  <TableCell>
                    {orderItem.money} / {orderItem.pledge < 0 ? '无' : orderItem.pledge}
                  </TableCell>
                  <TableCell>{dayjs(orderItem.createTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell padding={'none'}>
                    <ListItem>
                      <ListItemText primary={orderItem.name} secondary={`${orderItem.address} ${orderItem.phone}`} />
                    </ListItem>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              count={state.value?.total ?? 0}
              onChangePage={(event, page) => {
                setPageNum(page);
              }}
              page={pageNum}
              rowsPerPage={pageSize}
              onChangeRowsPerPage={(event) => {
                setPageSize(parseInt(event.target.value));
              }}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </Table>
        </Loading>
      </TableContainer>
    </MyDrawer>
  );
}
