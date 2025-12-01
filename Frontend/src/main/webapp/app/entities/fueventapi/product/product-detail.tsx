import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './product.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="fuEventUiApp.fueventapiProduct.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.name">Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.description">Description</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.description ? (
              <div>
                {productEntity.descriptionContentType ? (
                  <a onClick={openFile(productEntity.descriptionContentType, productEntity.description)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {productEntity.descriptionContentType}, {byteSize(productEntity.description)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="type">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.type">Type</Translate>
            </span>
          </dt>
          <dd>{productEntity.type}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="quantityTotal">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.quantityTotal">Quantity Total</Translate>
            </span>
          </dt>
          <dd>{productEntity.quantityTotal}</dd>
          <dt>
            <span id="quantitySold">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.quantitySold">Quantity Sold</Translate>
            </span>
          </dt>
          <dd>{productEntity.quantitySold}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="fuEventUiApp.fueventapiProduct.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{productEntity.imageUrl}</dd>
          <dt>
            <Translate contentKey="fuEventUiApp.fueventapiProduct.event">Event</Translate>
          </dt>
          <dd>{productEntity.event ? productEntity.event.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
