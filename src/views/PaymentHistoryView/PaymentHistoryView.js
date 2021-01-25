import React, { Fragment, useEffect } from 'react';

import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPayments } from '../../reducers';

export const PaymentHistoryView = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const payments = useSelector((state) => {
    return state.payments.payments;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchPayments({}));
    }
  }, [dispatch, isUserLoggedIn]);

  const EventElementContent = ({ event }) => {
    let eventUnwrap = event.event;
    let informations = [
      {
        label: 'Nazwa',
        value: eventUnwrap.name,
      },
      {
        label: 'Liczba uczestników',
        value: eventUnwrap.amount_of_participants,
      },
      {
        label: 'Cena',
        value: event.price,
      },
      {
        label: 'Miejsce',
        value: eventUnwrap.place.name,
      },
      {
        label: 'Czas rozpoczecia',
        value: eventUnwrap.start,
      },
    ];

    return (
      <Fragment>
        <List
          header={<h4 className={'events--informations--header'}>Informacje:</h4>}
          dataSource={informations}
          renderItem={(item) => (
            <List.Item className={'events--informations--item'}>
              <b>{item.label}: </b>
              {item.value}
            </List.Item>
          )}
        />
      </Fragment>
    );
  };

  return (
    <div>
      <h3>Historia płatności</h3>
      <Fragment>
        <List
          header={<h2 className={'events--list-view--header'}>Płatności</h2>}
          itemLayout='vertical'
          size='default'
          dataSource={payments[0]}
          pagination={{
            onChange: (page) => {},
            pageSize: 2,
          }}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <EventElementContent event={item} />
            </List.Item>
          )}
        />
      </Fragment>
    </div>
  );
};
