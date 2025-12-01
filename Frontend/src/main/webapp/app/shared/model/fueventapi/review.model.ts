import { IEvent } from 'app/shared/model/fueventapi/event.model';

export interface IReview {
  id?: number;
  comment?: string | null;
  rating?: number | null;
  userLogin?: string | null;
  event?: IEvent | null;
}

export const defaultValue: Readonly<IReview> = {};
