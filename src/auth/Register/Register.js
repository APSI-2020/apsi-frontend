import React, { useState, useCallback, useEffect } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  ConfirmPasswordFormItem,
  EmailFormItem,
  PasswordFormItem,
} from '../../components';
import { registerUser } from '../../reducers';
import { useRedirect } from '../../utils';

const formNames = {
  email: 'email',
  password: 'password',
  confirm_password: 'confirm_password',
  first_name: 'first_name',
  last_name: 'last_name',
};

const commonRules = [
  {
    whitespace: true,
    required: true,
    message: 'Pole nie może być puste',
  },
  {
    min: 3,
    required: 3,
    message: 'Wymagane są co najmniej 3 znaki',
  },
];

export const Register = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const [, redirectTo] = useRedirect();

  const onFormFinish = useCallback(
    (values) => {
      dispatch(registerUser(values))
        .then(unwrapResult)
        .then(() => {
          redirectTo();
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
    [dispatch, redirectTo],
  );

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 12 }}>
        <Typography.Title level={4}>Rejestracja</Typography.Title>
        <Form layout='vertical' onFinish={onFormFinish} form={form}>
          <EmailFormItem labelName={formNames.email} />
          <Form.Item name={formNames.first_name} label='Imię' rules={commonRules}>
            <Input />
          </Form.Item>
          <Form.Item name={formNames.last_name} label='Nazwisko' rules={commonRules}>
            <Input />
          </Form.Item>
          <PasswordFormItem labelName={formNames.password} />
          <ConfirmPasswordFormItem
            labelName={formNames.confirm_password}
            passwordLabelName={formNames.password}
          />
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
                Zarejestruj
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
