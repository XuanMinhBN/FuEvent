import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './transaction-history.reducer';
import { ITransactionHistory } from 'app/shared/model/fueventapi/transaction-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export const TransactionHistoryUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const transactionHistoryEntity = useAppSelector(state => state.transactionHistory.entity);
  const loading = useAppSelector(state => state.transactionHistory.loading);
  const updating = useAppSelector(state => state.transactionHistory.updating);
  const updateSuccess = useAppSelector(state => state.transactionHistory.updateSuccess);
  const transactionTypeValues = Object.keys(TransactionType);
  const handleClose = () => {
    props.history.push('/transaction-history' + props.location.search);
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
    values.transactionDate = convertDateTimeToServer(values.transactionDate);

    const entity = {
      ...transactionHistoryEntity,
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
      ? {
          transactionDate: displayDefaultDateTime(),
        }
      : {
          type: 'DEPOSIT',
          ...transactionHistoryEntity,
          transactionDate: convertDateTimeFromServer(transactionHistoryEntity.transactionDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fuEventUiApp.fueventapiTransactionHistory.home.createOrEditLabel" data-cy="TransactionHistoryCreateUpdateHeading">
            <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.home.createOrEditLabel">
              Create or edit a TransactionHistory
            </Translate>
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
                  id="transaction-history-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiTransactionHistory.amount')}
                id="transaction-history-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiTransactionHistory.type')}
                id="transaction-history-type"
                name="type"
                data-cy="type"
                type="select"
              >
                {transactionTypeValues.map(transactionType => (
                  <option value={transactionType} key={transactionType}>
                    {translate('fuEventUiApp.TransactionType.' + transactionType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('fuEventUiApp.fueventapiTransactionHistory.description')}
                id="transaction-history-description"
                name="description"
                data-cy="description"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiTransactionHistory.transactionDate')}
                id="transaction-history-transactionDate"
                name="transactionDate"
                data-cy="transactionDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fuEventUiApp.fueventapiTransactionHistory.walletId')}
                id="transaction-history-walletId"
                name="walletId"
                data-cy="walletId"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transaction-history" replace color="info">
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

export default TransactionHistoryUpdate;
