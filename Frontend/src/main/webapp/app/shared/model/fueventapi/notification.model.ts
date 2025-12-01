export interface INotification {
  id?: number;
  title?: string | null;
  message?: string | null;
  isRead?: boolean | null;
  userLogin?: string | null;
}

export const defaultValue: Readonly<INotification> = {
  isRead: false,
};
