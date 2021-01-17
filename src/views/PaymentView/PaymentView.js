import React from 'react';

import { DollarCircleOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Divider, message, Space, Statistic } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { makePayment } from '../../reducers';
import { useRedirect } from '../../utils';

export const PaymentView = () => {
  const { eventId, price } = useSelector((state) => state.payments);
  const dispatch = useDispatch();
  const [, redirectTo] = useRedirect();
  const onClick = () => {
    dispatch(makePayment(eventId))
      .then(unwrapResult)
      .then((response) => {
        if (response.status === 202) {
          message.success('Pomyślnie zapłacono za wydarzenie');
          redirectTo('/events');
        }
      })
      .catch((e) => {
        message.error('Nie udało się dokonać płatności');
      });
  };
  return (
    <div>
      <h3>Potwierdzenie płatności</h3>
      <Space direction='vertical' split={<Divider type='horizontal' />}>
        <h4>Podsumowanie</h4>
        <Space size='large' split={<Divider type='vertical' />}>
          <Statistic title='Id wydarzenia' value={eventId} />
          <Statistic
            title='Cena'
            value={price + ' zł'}
            prefix={<DollarCircleOutlined />}
          />
        </Space>
        <Button
          disabled={typeof eventId === 'undefined'}
          onClick={onClick}
          type='primary'
        >
          Zapłać
        </Button>
      </Space>
    </div>
  );
};
