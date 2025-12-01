import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDiscount } from 'app/shared/model/fueventapi/discount.model';
import { getEntities as getDiscounts } from 'app/entities/fueventapi/discount/discount.reducer';
import { IOrder } from 'app/shared/model/fueventapi/order.model';
import { getEntities as getOrders } from 'app/entities/fueventapi/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-discount.reducer';
import { IOrderDiscount } from 'app/shared/model/fueventapi/order-discount.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderDiscountUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const discounts = useAppSelector(state => state.discount.entities);
  const orders = useAppSelector(state => state.order.entities);
  const orderDiscountEntity = useAppSelector(state => state.orderDiscount.entity);
  const loading = useAppSelector(state => state.orderDiscount.loading);
  const updating = useAppSelector(state => state.orderDiscount.updating);
  const updateSuccess = useAppSelector(state => state.orderDiscount.updateSuccess);
  const handleClose = () => {
    props.history.push('/order-discount' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getDiscounts({}));
    dispatch(getOrders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.appliedAt = convertDateTimeToServer(values.appliedAt);

    const entity = {
      ...orderDiscountEntity,
      ...values,
      discount: discounts.find(it => it.id.toString() === values.discount.toString()),
      order: orders.find(it => it.id.toString() === values.order.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          appliedAt: displayDefaultDateTime(),
        }
      : {
          ...orderDiscountEntity,
          appliedAt: convertDateTimeFromServer(orderDiscountEntity.appliedAt),
          discount: orderDiscountEntity?.discount?.id,
          order: orderDiscountEntity?.order?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.fueventapiOrderDiscount.home.createOrEditLabel" data-cy="OrderDiscountCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.fueventapiOrderDiscount.home.createOrEditLabel">Create or edit a OrderDiscount</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="order-discount-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiOrderDiscount.appliedAt')}
                id="order-discount-appliedAt"
                name="appliedAt"
                data-cy="appliedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="order-discount-discount"
                name="discount"
                data-cy="discount"
                label={translate('fuEventUiApp.fueventapiOrderDiscount.discount')}
                type="select"
              >
                <option value="" key="0" />
                {discounts
                  ? discounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="order-discount-order"
                name="order"
                data-cy="order"
                label={translate('fuEventUiApp.fueventapiOrderDiscount.order')}
                type="select"
              >
                <option value="" key="0" />
                {orders
                  ? orders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order-discount" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderDiscountUpdate;
