import React from 'react';

import { Form, Input } from 'antd';

export const ConfirmPasswordFormItem = ({ labelName, passwordLabelName }) => {
  return (
    <Form.Item
      name={labelName}
      dependencies={[passwordLabelName]}
      label='Potwierdź hasło'
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Proszę potwierdzić hasło',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue(passwordLabelName) === value) {
              return Promise.resolve();
            }
            return Promise.reject('Hasła się nie zgadzają!');
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
  );
};
