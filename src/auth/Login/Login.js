import React, { useState, useEffect, useCallback } from 'react';

import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userLoggedIn } from '../../reducers';

const formNames = {
  login: 'login',
  password: 'password',
};

export const Login = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFormFinish = useCallback(
    (values) => {
      dispatch(userLoggedIn('token'));
      history.push('/');
    },
    [dispatch, history],
  );

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form form={form} layout='vertical' onFinish={onFormFinish}>
      <Form.Item
        label='Login'
        name={formNames.login}
        rules={[
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
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Zaloguj
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
