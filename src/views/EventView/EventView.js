import React, { Fragment, useEffect } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Avatar,
  PageHeader,
  List,
  Button,
  Statistic,
  Descriptions,
  Row,
} from 'antd';
import FileSaver from 'file-saver';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  fetchOneEvent,
  payForEvent,
  requestEventJoin,
  getQrCode,
} from '../../reducers';
import { useRedirect } from '../../utils';
import { axios } from '../../utils';

const Stats = ({ event }) => {
  return (
    <Row className={'event--statistic--row'}>
      <Statistic
        title={<b>Liczba uczestników</b>}
        value={event.amount_of_participants}
        className={'event--statistic--row--element'}
      />
      <Statistic
        title={<b>Limit uczestników</b>}
        value={event.limit_of_participants}
        className={'event--statistic--row--element'}
      />
      {event.price && (
        <Statistic
          title={<b>Cena</b>}
          suffix='PLN'
          value={event.price}
          className={'event--statistic--row--element'}
        />
      )}
    </Row>
  );
};

const Infos = ({ event }) => {
  return (
    <Fragment>
      <Descriptions size='small'>
        <Descriptions.Item label={<b>Czas rozpoczęcia</b>}>
          {event.start}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size='small'>
        <Descriptions.Item label={<b>Czas zakończenia</b>}>
          {event.end}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size='small'>
        <Descriptions.Item label={<b>Miejsce</b>}>
          {event.place.name} {event.place.address}
        </Descriptions.Item>
      </Descriptions>
    </Fragment>
  );
};

const LecturerListItem = ({ lecturer }) => {
  return (
    <Fragment>
      {lecturer.first_name} {lecturer.last_name}
    </Fragment>
  );
};

const LecturerList = ({ event }) => {
  return (
    <List
      className={'event--lecturer-list'}
      header={<h3>Prowadzący:</h3>}
      itemLayout='vertical'
      size='default'
      dataSource={event.lecturers}
      pagination={{
        onChange: (page) => {},
        pageSize: 3,
      }}
      renderItem={(lecturer) => (
        <List.Item key={lecturer.id}>
          <List.Item.Meta
            title={<LecturerListItem lecturer={lecturer} />}
            avatar={
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
              />
            }
            description={`email: ${lecturer.email}`}
          />
        </List.Item>
      )}
    />
  );
};

export const EventView = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const event = useSelector((state) => state.events.event);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [, redirectTo] = useRedirect();

  const onButtonClick = async () => {
    await dispatch(requestEventJoin(id));
    if (event.price) {
      dispatch(payForEvent(id))
        .then(unwrapResult)
        .then(() => {
          redirectTo(`/payments/${id}`);
        });
    }
  };

  const onJoinButtonClicked = async () => {
    let result = await axios.get(`/tickets/${id}`);
    var blob = new Blob([result.data], { type: 'application/pdf' });
    FileSaver.saveAs(blob, `${event.name}.pdf`);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchOneEvent(id));
    }
  }, [dispatch, isUserLoggedIn, id]);

  if (event) {
    return (
      <PageHeader
        className='site-page-header event--view'
        onBack={() => history.goBack()}
        title={event.name}
        extra={
          !event.is_signed_up_for
            ? [
                <Button onClick={onButtonClick} key='1' type='primary'>
                  Zapisz się
                </Button>,
              ]
            : [
                <Button onClick={onJoinButtonClicked} key='2' type='primary'>
                  Pobierz wejściówkę
                </Button>,
              ]
        }
      >
        <Infos event={event} />
        <Stats event={event} />
        <LecturerList event={event} />
      </PageHeader>
    );
  } else return <Fragment />;
};
