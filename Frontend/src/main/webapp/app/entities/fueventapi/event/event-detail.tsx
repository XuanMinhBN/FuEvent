import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './event.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EventDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const eventEntity = useAppSelector(state => state.event.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventDetailsHeading">
          <Translate contentKey="fuEventUiApp.fueventapiEvent.detail.title">Event</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{eventEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.title">Title</Translate>
            </span>
          </dt>
          <dd>{eventEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.description">Description</Translate>
            </span>
          </dt>
          <dd>
            {eventEntity.description ? (
              <div>
                {eventEntity.descriptionContentType ? (
                  <a onClick={openFile(eventEntity.descriptionContentType, eventEntity.description)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {eventEntity.descriptionContentType}, {byteSize(eventEntity.description)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="location">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.location">Location</Translate>
            </span>
          </dt>
          <dd>{eventEntity.location}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.status">Status</Translate>
            </span>
          </dt>
          <dd>{eventEntity.status}</dd>
          <dt>
            <span id="posterUrl">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.posterUrl">Poster Url</Translate>
            </span>
          </dt>
          <dd>{eventEntity.posterUrl}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>{eventEntity.startTime ? <TextFormat value={eventEntity.startTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>{eventEntity.endTime ? <TextFormat value={eventEntity.endTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="organizerLogin">
              <Translate contentKey="fuEventUiApp.fueventapiEvent.organizerLogin">Organizer Login</Translate>
            </span>
          </dt>
          <dd>{eventEntity.organizerLogin}</dd>
          <dt>
            <Translate contentKey="fuEventUiApp.fueventapiEvent.category">Category</Translate>
          </dt>
          <dd>{eventEntity.category ? eventEntity.category.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventDetail;
