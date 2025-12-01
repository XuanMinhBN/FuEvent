import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEvent } from 'app/shared/model/fueventapi/event.model';
import { getEntities as getEvents } from 'app/entities/fueventapi/event/event.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/fueventapi/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ProductType } from 'app/shared/model/enumerations/product-type.model';

export const ProductUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const events = useAppSelector(state => state.event.entities);
  const productEntity = useAppSelector(state => state.product.entity);
  const loading = useAppSelector(state => state.product.loading);
  const updating = useAppSelector(state => state.product.updating);
  const updateSuccess = useAppSelector(state => state.product.updateSuccess);
  const productTypeValues = Object.keys(ProductType);
  const handleClose = () => {
    props.history.push('/product' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getEvents({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...productEntity,
      ...values,
      event: events.find(it => it.id.toString() === values.event.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          type: 'TICKET',
          ...productEntity,
          event: productEntity?.event?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.fueventapiProduct.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.fueventapiProduct.home.createOrEditLabel">Create or edit a Product</Translate>
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
                  id="product-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.name')}
                id="product-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedBlobField
                label={translate('fuEventUiApp.fueventapiProduct.description')}
                id="product-description"
                name="description"
                data-cy="description"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.type')}
                id="product-type"
                name="type"
                data-cy="type"
                type="select"
              >
                {productTypeValues.map(productType => (
                  <option value={productType} key={productType}>
                    {translate('fuEventUiApp.ProductType.' + productType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.price')}
                id="product-price"
                name="price"
                data-cy="price"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.quantityTotal')}
                id="product-quantityTotal"
                name="quantityTotal"
                data-cy="quantityTotal"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.quantitySold')}
                id="product-quantitySold"
                name="quantitySold"
                data-cy="quantitySold"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiProduct.imageUrl')}
                id="product-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <ValidatedField
                id="product-event"
                name="event"
                data-cy="event"
                label={translate('fuEventUiApp.fueventapiProduct.event')}
                type="select"
              >
                <option value="" key="0" />
                {events
                  ? events.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
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

export default ProductUpdate;
