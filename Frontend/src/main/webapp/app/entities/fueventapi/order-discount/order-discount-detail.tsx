import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './order-discount.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const OrderDiscountDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const orderDiscountEntity = useAppSelector(state => state.orderDiscount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDiscountDetailsHeading">
          <Translate contentKey="fuEventUiApp.fueventapiOrderDiscount.detail.title">OrderDiscount</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderDiscountEntity.id}</dd>
          <dt>
            <span id="appliedAt">
              <Translate contentKey="fuEventUiApp.fueventapiOrderDiscount.appliedAt">Applied At</Translate>
            </span>
          </dt>
          <dd>
            {orderDiscountEntity.appliedAt ? (
              <TextFormat value={orderDiscountEntity.appliedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="fuEventUiApp.fueventapiOrderDiscount.discount">Discount</Translate>
          </dt>
          <dd>{orderDiscountEntity.discount ? orderDiscountEntity.discount.code : ''}</dd>
          <dt>
            <Translate contentKey="fuEventUiApp.fueventapiOrderDiscount.order">Order</Translate>
          </dt>
          <dd>{orderDiscountEntity.order ? orderDiscountEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-discount" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-discount/${orderDiscountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDiscountDetail;
