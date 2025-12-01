import dayjs from 'dayjs';
import { IEvent } from 'app/shared/model/fueventapi/event.model';

export interface IDiscount {
  id?: number;
  code?: string | null;
  descriptionContentType?: string | null;
  description?: string | null;
  percentage?: number | null;
  maxUsers?: number | null;
  validFrom?: string | null;
  validTo?: string | null;
  type?: string | null;
  userLogin?: string | null;
  event?: IEvent | null;
}

export const defaultValue: Readonly<IDiscount> = {};
