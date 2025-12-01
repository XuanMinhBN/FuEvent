import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './transaction-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const TransactionHistoryDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const transactionHistoryEntity = useAppSelector(state => state.transactionHistory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="transactionHistoryDetailsHeading">
          <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.detail.title">TransactionHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{transactionHistoryEntity.id}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{transactionHistoryEntity.amount}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.type">Type</Translate>
            </span>
          </dt>
          <dd>{transactionHistoryEntity.type}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.description">Description</Translate>
            </span>
          </dt>
          <dd>
            {transactionHistoryEntity.description ? (
              <div>
                {transactionHistoryEntity.descriptionContentType ? (
                  <a onClick={openFile(transactionHistoryEntity.descriptionContentType, transactionHistoryEntity.description)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {transactionHistoryEntity.descriptionContentType}, {byteSize(transactionHistoryEntity.description)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="transactionDate">
              <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.transactionDate">Transaction Date</Translate>
            </span>
          </dt>
          <dd>
            {transactionHistoryEntity.transactionDate ? (
              <TextFormat value={transactionHistoryEntity.transactionDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="walletId">
              <Translate contentKey="fuEventUiApp.fueventapiTransactionHistory.walletId">Wallet Id</Translate>
            </span>
          </dt>
          <dd>{transactionHistoryEntity.walletId}</dd>
        </dl>
        <Button tag={Link} to="/transaction-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction-history/${transactionHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TransactionHistoryDetail;
