import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import userProfile from 'app/entities/user-profile/user-profile.reducer';
// prettier-ignore
import event from 'app/entities/fueventapi/event/event.reducer';
// prettier-ignore
import order from 'app/entities/fueventapi/order/order.reducer';
// prettier-ignore
import orderItem from 'app/entities/fueventapi/order-item/order-item.reducer';
// prettier-ignore
import payment from 'app/entities/fueventapi/payment/payment.reducer';
// prettier-ignore
import product from 'app/entities/fueventapi/product/product.reducer';
// prettier-ignore
import category from 'app/entities/fueventapi/category/category.reducer';
// prettier-ignore
import review from 'app/entities/fueventapi/review/review.reducer';
// prettier-ignore
import discount from 'app/entities/fueventapi/discount/discount.reducer';
// prettier-ignore
import notification from 'app/entities/fueventapi/notification/notification.reducer';
// prettier-ignore
import wallet from 'app/entities/fueventapi/wallet/wallet.reducer';
// prettier-ignore
import orderDiscount from 'app/entities/fueventapi/order-discount/order-discount.reducer';
// prettier-ignore
import transactionHistory from 'app/entities/fueventapi/transaction-history/transaction-history.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  userProfile,
  event,
  order,
  orderItem,
  payment,
  product,
  category,
  review,
  discount,
  notification,
  wallet,
  orderDiscount,
  transactionHistory,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
