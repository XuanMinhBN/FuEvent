export interface IUserProfile {
  id?: number;
  phoneNumber?: string | null;
  description?: string | null;
  address?: string | null;
  studentCode?: string | null;
  walletId?: number | null;
  userId?: number;
}

export const defaultValue: Readonly<IUserProfile> = {};
