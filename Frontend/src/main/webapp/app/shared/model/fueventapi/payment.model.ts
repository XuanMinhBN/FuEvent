import dayjs from 'dayjs';
import { IOrder } from 'app/shared/model/fueventapi/order.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';

export interface IPayment {
  id?: number;
  amount?: number | null;
  paymentMethod?: string | null;
  status?: PaymentStatus | null;
  transactionId?: string | null;
  paymentTime?: string | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IPayment> = {};
