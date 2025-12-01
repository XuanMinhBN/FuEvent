import dayjs from 'dayjs';
import { IProduct } from 'app/shared/model/fueventapi/product.model';
import { IReview } from 'app/shared/model/fueventapi/review.model';
import { IDiscount } from 'app/shared/model/fueventapi/discount.model';
import { ICategory } from 'app/shared/model/fueventapi/category.model';
import { EventStatus } from 'app/shared/model/enumerations/event-status.model';

export interface IEvent {
  id?: number;
  title?: string | null;
  descriptionContentType?: string | null;
  description?: string | null;
  location?: string | null;
  status?: EventStatus | null;
  posterUrl?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  organizerLogin?: string | null;
  products?: IProduct[] | null;
  reviews?: IReview[] | null;
  discounts?: IDiscount[] | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IEvent> = {};
