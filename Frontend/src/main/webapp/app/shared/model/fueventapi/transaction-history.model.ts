import dayjs from 'dayjs';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ITransactionHistory {
  id?: number;
  amount?: number;
  type?: TransactionType;
  descriptionContentType?: string | null;
  description?: string | null;
  transactionDate?: string | null;
  walletId?: number | null;
}

export const defaultValue: Readonly<ITransactionHistory> = {};
