import dayjs from 'dayjs';
import { IOrderDiscount } from 'app/shared/model/fueventapi/order-discount.model';
import { IOrderItem } from 'app/shared/model/fueventapi/order-item.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  totalAmount?: number | null;
  status?: OrderStatus | null;
  userLogin?: string | null;
  orderedAt?: string | null;
  orderDiscounts?: IOrderDiscount[] | null;
  orderItems?: IOrderItem[] | null;
}

export const defaultValue: Readonly<IOrder> = {};
