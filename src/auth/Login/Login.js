import React, { useState, useEffect, useCallback } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Form, message, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { EmailFormItem, PasswordFormItem } from '../../components';
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
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <Typography.Title level={4}>Logowanie</Typography.Title>
        <Form form={form} layout='vertical' onFinish={onFormFinish}>
          <EmailFormItem labelName={formNames.email} />
          <PasswordFormItem labelName={formNames.password} />
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length ||
                  loading
                }
                size='large'
              >
                Zaloguj
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            Nie masz konta?
            <Link to='/auth/register'>
              <Button type='link'>Zarejestruj się</Button>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
