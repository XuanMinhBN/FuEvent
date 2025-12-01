import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/user-profile">
      <Translate contentKey="global.menu.entities.userProfile" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/event">
      <Translate contentKey="global.menu.entities.fueventapiEvent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/order">
      <Translate contentKey="global.menu.entities.fueventapiOrder" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/order-item">
      <Translate contentKey="global.menu.entities.fueventapiOrderItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payment">
      <Translate contentKey="global.menu.entities.fueventapiPayment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/product">
      <Translate contentKey="global.menu.entities.fueventapiProduct" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.fueventapiCategory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/review">
      <Translate contentKey="global.menu.entities.fueventapiReview" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/discount">
      <Translate contentKey="global.menu.entities.fueventapiDiscount" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.fueventapiNotification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/wallet">
      <Translate contentKey="global.menu.entities.fueventapiWallet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/order-discount">
      <Translate contentKey="global.menu.entities.fueventapiOrderDiscount" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction-history">
      <Translate contentKey="global.menu.entities.fueventapiTransactionHistory" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
