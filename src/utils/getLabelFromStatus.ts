import { StatusType } from './http/order/shopOrders';

export function getLabelFromStatus(status: StatusType): string {
  switch (status) {
    case 'abandon':
      return '用户退货中';
    case 'abandoned':
      return '退货已完成';
    case 'create':
      return '新创建订单';
    case 'expired':
      return '用户租用超时';
    case 'expressed':
      return '用户租用中';
    case 'expressing':
      return '商家已发货';
    case 'finish':
      return '已完成';
    case 'overtime':
      return '用户付款已超时';
    case 'payed':
      return '待商家发货';
    case 'paying':
      return '用户付款中';
    case 'revert':
      return '用户租用退回中';
  }
}
