import dayjs from 'dayjs';
import { IDiscount } from 'app/shared/model/fueventapi/discount.model';
import { IOrder } from 'app/shared/model/fueventapi/order.model';

export interface IOrderDiscount {
  id?: number;
  appliedAt?: string | null;
  discount?: IDiscount | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderDiscount> = {};
