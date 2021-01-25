import React, { Fragment, useEffect, useCallback } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input, notification, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { putEvent } from '../../reducers';
import {
  fetchAllPlaces,
  fetchLectureres,
} from '../../reducers/dataReducer/placeReducer';

export const EventNew = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchLectureres({}));
      dispatch(fetchAllPlaces({}));
    }
  }, [dispatch, isUserLoggedIn]);

  // TODO: fetch from the API
  const lecturers = useSelector((state) => {
    console.log('Wykladowcy wykladowcy');
    console.log(state.places);
    console.log('Wykladowcy wykladowcy');
    return state.places.lecturers;
  });

  const places = useSelector((state) => {
    return state.places.places;
  });

  const createEvent = useCallback(
    (values) => {
      dispatch(putEvent(values))
        .then(unwrapResult)
        .then(() => {
          history.push('/');
        })
        .catch(() => {
          notification.error(
            {
              message: 'Pojawił się błąd',
              description: 'Prosimy spróbować później',
            },
            1.5,
          );
        });
    },
    [dispatch, history],
  );

  return (
    <Form layout='vertical' onFinish={createEvent} form={form}>
      <Form.Item name={'name'} label='Nazwa'>
        <Input />
      </Form.Item>
      <Form.Item name={'start'} label='Data Rozpoczecia'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name={'end'} label='Data Zakończenia'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name={'limit_of_participants'} label='Limit uczestników'>
        <Input />
      </Form.Item>
      <Form.Item name={'place'} label='Miejsce'>
        <Select>
          {places.map((d) => (
            <Select.Option key={d.id}>{d.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={'lecturers'} label='Prowadzący'>
        <Select mode='multiple'>
          {lecturers.map((d) => (
            <Select.Option key={d.id}>
              {d.title + ' ' + d.first_name + ' ' + d.last_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type='primary' htmlType='submit'>
            Stwórz
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
