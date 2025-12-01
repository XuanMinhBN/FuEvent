import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './discount.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const DiscountDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const discountEntity = useAppSelector(state => state.discount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="discountDetailsHeading">
          <Translate contentKey="fuEventUiApp.fueventapiDiscount.detail.title">Discount</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{discountEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.code">Code</Translate>
            </span>
          </dt>
          <dd>{discountEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.description">Description</Translate>
            </span>
          </dt>
          <dd>
            {discountEntity.description ? (
              <div>
                {discountEntity.descriptionContentType ? (
                  <a onClick={openFile(discountEntity.descriptionContentType, discountEntity.description)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {discountEntity.descriptionContentType}, {byteSize(discountEntity.description)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="percentage">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.percentage">Percentage</Translate>
            </span>
          </dt>
          <dd>{discountEntity.percentage}</dd>
          <dt>
            <span id="maxUsers">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.maxUsers">Max Users</Translate>
            </span>
          </dt>
          <dd>{discountEntity.maxUsers}</dd>
          <dt>
            <span id="validFrom">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.validFrom">Valid From</Translate>
            </span>
          </dt>
          <dd>{discountEntity.validFrom ? <TextFormat value={discountEntity.validFrom} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="validTo">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.validTo">Valid To</Translate>
            </span>
          </dt>
          <dd>{discountEntity.validTo ? <TextFormat value={discountEntity.validTo} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.type">Type</Translate>
            </span>
          </dt>
          <dd>{discountEntity.type}</dd>
          <dt>
            <span id="userLogin">
              <Translate contentKey="fuEventUiApp.fueventapiDiscount.userLogin">User Login</Translate>
            </span>
          </dt>
          <dd>{discountEntity.userLogin}</dd>
          <dt>
            <Translate contentKey="fuEventUiApp.fueventapiDiscount.event">Event</Translate>
          </dt>
          <dd>{discountEntity.event ? discountEntity.event.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/discount" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/discount/${discountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DiscountDetail;
