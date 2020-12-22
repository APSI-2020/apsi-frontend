import React from 'react';

import { Form, Input } from 'antd';

export const PasswordFormItem = ({ labelName }) => {
  return (
    <Form.Item
      name={labelName}
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
          message: 'Hasło musi zawierać co najmniej 8 znaków',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
};
