import React, { Fragment, useEffect } from 'react';

import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllPayments } from '../../reducers';

export const PaymentHistoryView = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const payments = useSelector((state) => {
    console.log(state);
    return state.payments.payments;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserLoggedIn) {
      console.log('Use effect');
      dispatch(fetchAllPayments());
    }
  }, [dispatch, isUserLoggedIn]);

  const EventElementContent = ({ event }) => {
    let informations = [
      {
        label: 'Start',
        value: event.start,
      },
      {
        label: 'Koniec',
        value: event.end,
      },
      {
        label: 'Liczba uczestników',
        value: event.amount_of_participants,
      },
    ];
  };

  return (
    <div>
      <h3>Historia płatności</h3>
      <Fragment>
        <List
          header={<h2 className={'events--list-view--header'}>Płatności</h2>}
          itemLayout='vertical'
          size='default'
          dataSource={payments}
          pagination={{
            onChange: (page) => {},
            pageSize: 2,
          }}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <EventElementContent event={item} />
              {/* <EventsTagList event={item} /> */}
            </List.Item>
          )}
        />
      </Fragment>
    </div>
  );
};
