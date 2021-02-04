import React, { Fragment, useCallback, useState, useEffect } from 'react';

import { DatePicker, Input, InputNumber, Form, Collapse, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllEvents, setFilters } from '../../reducers';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

Date.prototype.toIsoString = function () {
  var tzo = -this.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return (
    this.getFullYear() +
    '-' +
    pad(this.getMonth() + 1) +
    '-' +
    pad(this.getDate()) +
    'T' +
    pad(this.getHours()) +
    ':' +
    pad(this.getMinutes()) +
    ':' +
    pad(this.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ':' +
    pad(tzo % 60)
  );
};

export const EventsFilters = () => {
  const filters = useSelector((state) => state.events.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents({}));
  }, [filters]);

  const onDatePickerDatesChanged = useCallback(
    (val) => {
      if (val) {
        dispatch(
          setFilters({
            ...filters,
            date_from: val[0].toDate().toIsoString(),
            date_to: val[1].toDate().toIsoString(),
          }),
        );
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.date_from;
        delete filtersCpy.date_to;
        dispatch(setFilters(filtersCpy));
      }
    },
    [filters, dispatch],
  );

  const onNameContainsInputChanged = useCallback(
    (e) => {
      if (e.target.value) {
        dispatch(
          setFilters({
            ...filters,
            name_contains: e.target.value,
          }),
        );
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.name_contains;
        dispatch(setFilters(filtersCpy));
      }
    },
    [filters, dispatch],
  );

  const onPlaceInputChanged = useCallback(
    (e) => {
      if (e.target.value) {
        dispatch(
          setFilters({
            ...filters,
            place: e.target.value,
          }),
        );
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.place;
        dispatch(setFilters(filtersCpy));
      }
    },
    [filters, dispatch],
  );

  const onPriceInputChanged = useCallback(
    (val) => {
      if (val) {
        dispatch(
          setFilters({
            ...filters,
            price: val,
          }),
        );
      } else {
        let filtersCpy = { ...filters };
        delete filtersCpy.price;
        dispatch(setFilters(filtersCpy));
      }
    },
    [filters, dispatch],
  );

  const onOnlyNotCyclicalAndRootsChanged = useCallback(
    (e) => {
      let filtersCpy = { ...filters };
      if (e.target.checked) {
        filtersCpy.only_not_cyclical_and_roots = false;
      } else {
        filtersCpy.only_not_cyclical_and_roots = true;
      }

      dispatch(setFilters(filtersCpy));
    },
    [filters, dispatch],
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
          <Form.Item label='Pokaż wszystkie daty wydarzeń cyklicznych'>
            <Checkbox
              checked={!filters.only_not_cyclical_and_roots}
              onChange={onOnlyNotCyclicalAndRootsChanged}
            />
          </Form.Item>
          <Form />
        </Panel>
      </Collapse>
    </Fragment>
  );
};
