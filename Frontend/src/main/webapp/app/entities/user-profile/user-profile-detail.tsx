import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-profile.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserProfileDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userProfileDetailsHeading">
          <Translate contentKey="fuEventUiApp.userProfile.detail.title">UserProfile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.id}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="fuEventUiApp.userProfile.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.phoneNumber}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="fuEventUiApp.userProfile.description">Description</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.description}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="fuEventUiApp.userProfile.address">Address</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.address}</dd>
          <dt>
            <span id="studentCode">
              <Translate contentKey="fuEventUiApp.userProfile.studentCode">Student Code</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.studentCode}</dd>
          <dt>
            <span id="walletId">
              <Translate contentKey="fuEventUiApp.userProfile.walletId">Wallet Id</Translate>
            </span>
          </dt>
          <dd>{userProfileEntity.walletId}</dd>
        </dl>
        <Button tag={Link} to="/user-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserProfileDetail;
