import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserProfileUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const userProfileEntity = useAppSelector(state => state.userProfile.entity);
  const loading = useAppSelector(state => state.userProfile.loading);
  const updating = useAppSelector(state => state.userProfile.updating);
  const updateSuccess = useAppSelector(state => state.userProfile.updateSuccess);
  const handleClose = () => {
    props.history.push('/user-profile' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...userProfileEntity,
      ...values,
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
          ...userProfileEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.userProfile.home.createOrEditLabel" data-cy="UserProfileCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.userProfile.home.createOrEditLabel">Create or edit a UserProfile</Translate>
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
                  id="user-profile-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.userProfile.phoneNumber')}
                id="user-profile-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.userProfile.description')}
                id="user-profile-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.userProfile.address')}
                id="user-profile-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.userProfile.studentCode')}
                id="user-profile-studentCode"
                name="studentCode"
                data-cy="studentCode"
                type="text"
              />
              <ValidatedField
                label={translate('fuEventUiApp.userProfile.walletId')}
                id="user-profile-walletId"
                name="walletId"
                data-cy="walletId"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-profile" replace color="info">
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

export default UserProfileUpdate;
