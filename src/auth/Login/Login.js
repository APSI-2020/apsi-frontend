import React, { useState, useEffect, useCallback } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../../reducers';

const formNames = {
  email: 'email',
  password: 'password',
};

export const Login = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFormFinish = useCallback(
    (values) => {
      dispatch(loginUser(values))
        .then(unwrapResult)
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          form.setFields(
            Object.entries(error).map(([key, value]) => {
              return { name: key, errors: value };
            }),
          );
          if (error.hasOwnProperty('detail')) {
            message.error(error.detail);
          }
        });
    },
    [dispatch, history, form],
  );

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form form={form} layout='vertical' onFinish={onFormFinish}>
      <Form.Item
        label='Email'
        name={formNames.email}
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Nie jest to poprawny adres email',
          },
          {
            whitespace: true,
            required: true,
            message: 'Login nie może być pusty',
          },
          {
            min: 3,
            required: true,
            message: 'Wymagane są conajmniej 3 znaki',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={formNames.password}
        label='Hasło'
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Hasło nie może być puste',
          },
          {
            required: true,
            min: 8,
            message: 'Hasło musi zawierać conajmniej 8 znaków',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length ||
              loading
            }
          >
            Zaloguj
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
