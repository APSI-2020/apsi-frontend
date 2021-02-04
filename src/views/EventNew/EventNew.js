import React, { useEffect, useCallback, useState } from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Form,
  Input,
  notification,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { putEvent } from '../../reducers';
import {
  fetchAllPlaces,
  fetchLectureres,
} from '../../reducers/dataReducer/placeReducer';

const formFields = {
  requirements: 'requirements',
  price: 'price',
};

const requirementsType = {
  BELONGS_TO_ANY_OF: 'BELONGS_TO_ANY_OF',
  DOES_NOT_BELONG_TO_ANY_OF: 'DOES_NOT_BELONG_TO_ANY_OF',
  BELONGS_EXACTLY_TO: 'BELONGS_EXACTLY_TO',
};

export const EventNew = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchLectureres({}));
      dispatch(fetchAllPlaces({}));
    }
  }, [dispatch, isUserLoggedIn]);

  const lecturers = useSelector((state) => {
    return state.places.lecturers;
  });

  const places = useSelector((state) => {
    return state.places.places;
  });

  const createEvent = useCallback(
    (values) => {
      setLoading(true);
      dispatch(putEvent(values))
        .then(unwrapResult)
        .then(() => {
          history.push('/');
        })
        .catch((e) => {
          setLoading(false);
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
    <Form
      layout='vertical'
      onFinish={createEvent}
      form={form}
      initialValues={{ [formFields.requirements]: [] }}
    >
      <Form.Item
        name={'name'}
        label='Nazwa'
        rules={[
          {
            required: true,
            message: 'Tytuł wydarzenia nie może być pusty',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'start'}
        label='Data Rozpoczecia'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać datę rozpoczęcia wydarzenia',
          },
        ]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={'end'}
        label='Data Zakończenia'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać datę zakończenia wydarzenia',
          },
        ]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={'limit_of_participants'}
        label='Limit uczestników'
        rules={[
          {
            required: true,
            message: 'Proszę wpisać limit uczestników',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={'place'}
        label='Miejsce'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać miejsce wydarzenia',
          },
        ]}
      >
        <Select>
          {places.map((d) => (
            <Select.Option key={d.id}>{d.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={'frequency'} label='Częstotliwość'>
        <Select>
          <Select.Option key='ONCE'>Jednorazowe</Select.Option>
          <Select.Option key='DAILY'>Codzienne</Select.Option>
          <Select.Option key='WEEKLY'>Cotygodniowe</Select.Option>
          <Select.Option key='MONTHLY'>Miesięczne</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={'cyclic_boundary'}
        label='Data zakończenia wydarzenia cyklicznego'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać datę zakończenia wydarzenia cyklicznego',
          },
        ]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name={'lecturers'}
        label='Prowadzący'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać co najmniej 1 prowadzącego',
          },
        ]}
      >
        <Select mode='multiple'>
          {lecturers.map((d) => (
            <Select.Option key={d.id}>
              {d.title + ' ' + d.first_name + ' ' + d.last_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={formFields.price} label='Cena'>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.List name={formFields.requirements}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                style={{ width: '100%' }}
                className='requirements-space'
              >
                <Form.Item noStyle>
                  <Form.Item
                    label='Typ wymagań'
                    name={[field.name, 'type']}
                    fieldKey={[field.fieldKey, 'type']}
                    className='form-item-requirement-type'
                    rules={[
                      { required: true, message: 'Należy wybrać typ wymagań' },
                    ]}
                  >
                    <Select>
                      {Object.entries(requirementsType).map(([key, value]) => (
                        <Select.Option value={value} key={key}>
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label='Grupa'
                    className='form-item-requirement-groups'
                    name={[field.name, 'groups']}
                    fieldKey={[field.fieldKey, 'groups']}
                    rules={[{ required: true, message: 'Nie może być puste' }]}
                  >
                    <Select mode='tags' tokenSeparators={[',']} />
                  </Form.Item>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Dodaj wymaganie
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Stwórz
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
