import { IEvent } from 'app/shared/model/fueventapi/event.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  descriptionContentType?: string | null;
  description?: string | null;
  events?: IEvent[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
