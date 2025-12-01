import { IEvent } from 'app/shared/model/fueventapi/event.model';
import { ProductType } from 'app/shared/model/enumerations/product-type.model';

export interface IProduct {
  id?: number;
  name?: string | null;
  descriptionContentType?: string | null;
  description?: string | null;
  type?: ProductType | null;
  price?: number | null;
  quantityTotal?: number | null;
  quantitySold?: number | null;
  imageUrl?: string | null;
  event?: IEvent | null;
}

export const defaultValue: Readonly<IProduct> = {};
