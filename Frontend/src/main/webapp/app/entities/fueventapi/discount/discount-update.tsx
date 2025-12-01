import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEvent } from 'app/shared/model/fueventapi/event.model';
import { getEntities as getEvents } from 'app/entities/fueventapi/event/event.reducer';
import { getEntity, updateEntity, createEntity, reset } from './discount.reducer';
import { IDiscount } from 'app/shared/model/fueventapi/discount.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const DiscountUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const events = useAppSelector(state => state.event.entities);
  const discountEntity = useAppSelector(state => state.discount.entity);
  const loading = useAppSelector(state => state.discount.loading);
  const updating = useAppSelector(state => state.discount.updating);
  const updateSuccess = useAppSelector(state => state.discount.updateSuccess);
  const handleClose = () => {
    props.history.push('/discount' + props.location.search);
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
    values.validFrom = convertDateTimeToServer(values.validFrom);
    values.validTo = convertDateTimeToServer(values.validTo);

    const entity = {
      ...discountEntity,
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
      ? {
          validFrom: displayDefaultDateTime(),
          validTo: displayDefaultDateTime(),
        }
      : {
          ...discountEntity,
          validFrom: convertDateTimeFromServer(discountEntity.validFrom),
          validTo: convertDateTimeFromServer(discountEntity.validTo),
          event: discountEntity?.event?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.fueventapiDiscount.home.createOrEditLabel" data-cy="DiscountCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.fueventapiDiscount.home.createOrEditLabel">Create or edit a Discount</Translate>
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
                  id="discount-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.code')}
                id="discount-code"
                name="code"
                data-cy="code"
                type="text"
              />
              <ValidatedBlobField
                label={translate('fuEventUiApp.fueventapiDiscount.description')}
                id="discount-description"
                name="description"
                data-cy="description"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.percentage')}
                id="discount-percentage"
                name="percentage"
                data-cy="percentage"
                type="text"
                validate={{
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  max: { value: 100, message: translate('entity.validation.max', { max: 100 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.maxUsers')}
                id="discount-maxUsers"
                name="maxUsers"
                data-cy="maxUsers"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.validFrom')}
                id="discount-validFrom"
                name="validFrom"
                data-cy="validFrom"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.validTo')}
                id="discount-validTo"
                name="validTo"
                data-cy="validTo"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.type')}
                id="discount-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiDiscount.userLogin')}
                id="discount-userLogin"
                name="userLogin"
                data-cy="userLogin"
                type="text"
              />
              <ValidatedField
                id="discount-event"
                name="event"
                data-cy="event"
                label={translate('fuEventUiApp.fueventapiDiscount.event')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/discount" replace color="info">
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

export default DiscountUpdate;
