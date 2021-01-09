import React, { Fragment, useCallback, useState, useEffect } from 'react';

import { DatePicker, Input, InputNumber, Form, Collapse } from 'antd';
import { useDispatch } from 'react-redux';

import { fetchAllEvents } from '../../reducers';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export const EventsFilters = () => {
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents(filters));
  }, [filters]);

  const onDatePickerDatesChanged = useCallback(
    (val) => {
      if (val) {
        setFilters({
          ...filters,
          date_from: val[0].toISOString(),
          date_to: val[1].toISOString(),
        });
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.date_from;
        delete filtersCpy.date_to;
        setFilters(filtersCpy);
      }
    },
    [filters, setFilters],
  );

  const onNameContainsInputChanged = useCallback(
    (e) => {
      if (e.target.value) {
        setFilters({
          ...filters,
          name_contains: e.target.value,
        });
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.name_contains;
        setFilters(filtersCpy);
      }
    },
    [filters, setFilters],
  );

  const onPlaceInputChanged = useCallback(
    (e) => {
      if (e.target.value) {
        setFilters({
          ...filters,
          place: e.target.value,
        });
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.place;
        setFilters(filtersCpy);
      }
    },
    [filters, setFilters],
  );

  const onPriceInputChanged = useCallback(
    (val) => {
      if (val) {
        setFilters({
          ...filters,
          price: val,
        });
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.price;
        setFilters(filtersCpy);
      }
    },
    [filters, setFilters],
  );

  return (
    <Fragment>
      <Collapse>
        <Panel header='Filtry'>
          <Form
            labelCol={{
              xs: { span: 24 },
              sm: { span: 4 },
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 20 },
            }}
            layout='horizontal'
          />
          <Form.Item label='Filtr nazwy'>
            <Input
              placeholder='nazwa zawiera'
              size='small'
              onChange={onNameContainsInputChanged}
            />
          </Form.Item>
          <Form.Item label='Filtr miejsca'>
            <Input
              placeholder='miejsce'
              size='small'
              onChange={onPlaceInputChanged}
            />
          </Form.Item>
          <Form.Item label='Filtr ceny'>
            <InputNumber
              placeholder='cena'
              size='small'
              step={0.1}
              onChange={onPriceInputChanged}
            />
          </Form.Item>
          <Form.Item label='Filtr daty'>
            <RangePicker onChange={onDatePickerDatesChanged} />
          </Form.Item>
          <Form />
        </Panel>
      </Collapse>
    </Fragment>
  );
};
