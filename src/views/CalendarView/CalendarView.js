import React, { Fragment, useEffect, useRef, useCallback, useMemo } from 'react';

import moment from 'moment';
import { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import 'react-big-scheduler/lib/css/style.css';

import { fetchAllEvents } from '../../reducers';
import { rgbToHex, randomColor } from '../../utils';
import { EventsScheduler } from './EventsScheduler';

const defaultResourceId = 'r0';

const apiEventsToSchedulerEvents = (events) => {
  return events.map((event) => {
    return Object.assign(Object.assign({}, event), {
      resourceId: defaultResourceId,
      bgColor: rgbToHex(randomColor()),
      title: event.name,
    });
  });
};

const useSchedulerEvents = (state) => {
  const events = useSelector((state) => state.events.events);

  const schedulerEvents = useMemo(() => {
    //TODO: filter on server
    return apiEventsToSchedulerEvents(
      events.filter((event) => event.is_signed_up_for),
    );
  }, [events]);

  return schedulerEvents;
};

const CalendarView = ({ state }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const schedulerEvents = useSchedulerEvents();
  const schedulerData = useRef(
    new SchedulerData(
      new moment().format(DATE_FORMAT),
      ViewTypes.Day,
      false,
      false,
      { eventItemPopoverEnabled: false },
    ),
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchAllEvents());
    }
  }, [dispatch, isUserLoggedIn, location]);

  useEffect(() => {
    let resources = [
      {
        id: defaultResourceId,
        name: 'Moje wydarzenia',
      },
    ];
    schedulerData.current.setResources(resources);
  }, [schedulerData]);

  const eventClicked = useCallback(
    (event) => {
      history.push(`/events/${event.id}`);
    },
    [history],
  );

  return (
    <Fragment>
      <EventsScheduler
        schedulerData={schedulerData.current}
        onEventClicked={eventClicked}
        events={schedulerEvents}
      />
    </Fragment>
  );
};

export default DragDropContext(HTML5Backend)(CalendarView);
