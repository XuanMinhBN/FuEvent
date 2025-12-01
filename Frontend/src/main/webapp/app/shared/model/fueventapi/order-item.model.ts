import { IProduct } from 'app/shared/model/fueventapi/product.model';
import { IOrder } from 'app/shared/model/fueventapi/order.model';

export interface IOrderItem {
  id?: number;
  quantity?: number | null;
  unitPrice?: number | null;
  product?: IProduct | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
