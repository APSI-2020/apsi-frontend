import React, { Fragment, useEffect } from 'react';

import { CalendarOutlined } from '@ant-design/icons';
import { List, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllEvents } from '../../reducers';

const EventsTagList = ({ event }) => {
  return (
    <Fragment>
      <div className={'events--tags-list'}>
        {event.tags.map((tag, idx) => {
          return (
            <Tag key={idx} color={'orange'}>
              {tag}
            </Tag>
          );
        })}
      </div>
    </Fragment>
  );
};

const EventElementContent = ({ event }) => {
  let informations = [
    {
      label: 'Start',
      value: event.start,
    },
    {
      label: 'Koniec',
      value: event.end,
    },
    {
      label: 'Liczba uczestników',
      value: event.amountOfParticipants,
    },
  ];

  return (
    <Fragment>
      <List
        header={<h4 className={'events--informations--header'}>Informacje:</h4>}
        dataSource={informations}
        renderItem={(item) => (
          <List.Item className={'events--informations--item'}>
            <b>{item.label}: </b>
            {item.value}
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export const EventsView = () => {
  const isUserLoggedIn = useSelector((state) => state.authDb.isUserLoggedIn);
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
    //   if (isUserLoggedIn) {
    dispatch(fetchAllEvents());
    //   }
  }, [dispatch, isUserLoggedIn]);

  return (
    <Fragment>
      <List
        header={<h2 className={'events--list-view--header'}>Wydarzenia</h2>}
        itemLayout='vertical'
        size='default'
        dataSource={events}
        pagination={{
          onChange: (page) => {},
          pageSize: 2,
        }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              className={'events--list-view--item--meta'}
              title={<Link to={`/events?id=${item.id}`}>{item.name}</Link>}
              description={''}
              avatar={<CalendarOutlined />}
            />
            <EventElementContent event={item} />
            <EventsTagList event={item} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
