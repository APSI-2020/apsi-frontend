import React from 'react';

import { Form, Input } from 'antd';

export const EmailFormItem = ({ labelName }) => {
  return (
    <Form.Item
      label='Email'
      name={labelName}
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
  );
};
