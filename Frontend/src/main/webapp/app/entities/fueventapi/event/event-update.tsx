import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategory } from 'app/shared/model/fueventapi/category.model';
import { getEntities as getCategories } from 'app/entities/fueventapi/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/fueventapi/event.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { EventStatus } from 'app/shared/model/enumerations/event-status.model';

export const EventUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const categories = useAppSelector(state => state.category.entities);
  const eventEntity = useAppSelector(state => state.event.entity);
  const loading = useAppSelector(state => state.event.loading);
  const updating = useAppSelector(state => state.event.updating);
  const updateSuccess = useAppSelector(state => state.event.updateSuccess);
  const eventStatusValues = Object.keys(EventStatus);
  const handleClose = () => {
    props.history.push('/event' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    const entity = {
      ...eventEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.category.toString()),
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
          startTime: displayDefaultDateTime(),
          endTime: displayDefaultDateTime(),
        }
      : {
          status: 'PENDING',
          ...eventEntity,
          startTime: convertDateTimeFromServer(eventEntity.startTime),
          endTime: convertDateTimeFromServer(eventEntity.endTime),
          category: eventEntity?.category?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.fueventapiEvent.home.createOrEditLabel" data-cy="EventCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.fueventapiEvent.home.createOrEditLabel">Create or edit a Event</Translate>
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
                  id="event-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.title')}
                id="event-title"
                name="title"
                data-cy="title"
                type="text"
              />
              <ValidatedBlobField
                label={translate('fuEventUiApp.fueventapiEvent.description')}
                id="event-description"
                name="description"
                data-cy="description"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.location')}
                id="event-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.status')}
                id="event-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {eventStatusValues.map(eventStatus => (
                  <option value={eventStatus} key={eventStatus}>
                    {translate('fuEventUiApp.EventStatus.' + eventStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.posterUrl')}
                id="event-posterUrl"
                name="posterUrl"
                data-cy="posterUrl"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.startTime')}
                id="event-startTime"
                name="startTime"
                data-cy="startTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.endTime')}
                id="event-endTime"
                name="endTime"
                data-cy="endTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiEvent.organizerLogin')}
                id="event-organizerLogin"
                name="organizerLogin"
                data-cy="organizerLogin"
                type="text"
              />
              <ValidatedField
                id="event-category"
                name="category"
                data-cy="category"
                label={translate('fuEventUiApp.fueventapiEvent.category')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event" replace color="info">
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

export default EventUpdate;
