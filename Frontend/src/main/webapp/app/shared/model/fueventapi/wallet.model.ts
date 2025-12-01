export interface IWallet {
  id?: number;
  balance?: number | null;
  userLogin?: string | null;
}

export const defaultValue: Readonly<IWallet> = {};
