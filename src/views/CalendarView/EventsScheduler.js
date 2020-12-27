import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';

import Scheduler from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';

// ugly hack to keep right width of calendar table,
// because default component logic is to fit window
const updateViewWidth = () => {
  let calendarTable = document.getElementById('RBS-Scheduler-root');
  let schedulerViewNode = document.getElementsByClassName('scheduler-view')[0];

  calendarTable.style.width = `${0.8 * calendarTable.parentNode.clientWidth}px`;

  if (schedulerViewNode)
    schedulerViewNode.style.width = `${
      0.8 * calendarTable.parentNode.clientWidth
    }px`;
};

// scheduler wrapper component
export const EventsScheduler = ({ schedulerData, events, onEventClicked }) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const resizeObserver = useRef(null);

  useEffect(() => {
    let calendarTable = document.getElementById('RBS-Scheduler-root');
    resizeObserver.current = new ResizeObserver(() => {
      updateViewWidth();
    });
    resizeObserver.current.observe(calendarTable);

    return () => {
      resizeObserver.current.unobserve(calendarTable);
    };
  }, []);

  useEffect(() => {
    schedulerData.setEvents(events);
    forceUpdate();
    updateViewWidth();
  }, [schedulerData, events, forceUpdate]);

  const eventClicked = useCallback(
    (schedulerData, event) => {
      onEventClicked(event);
    },
    [onEventClicked],
  );

  const toggleExpandFunc = useCallback((schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
  }, []);

  const onViewChange = useCallback(
    (schedData, view) => {
      schedulerData.setViewType(
        view.viewType,
        view.showAgenda,
        view.isEventPerspective,
      );
      schedulerData.setEvents(events);
      forceUpdate();
      updateViewWidth();
    },
    [schedulerData, events, forceUpdate],
  );

  const prevClick = useCallback(
    (schedData) => {
      schedulerData.prev();
      schedulerData.setEvents(events);
      forceUpdate();
      updateViewWidth();
    },
    [schedulerData, events, forceUpdate],
  );

  const nextClick = useCallback(
    (schedData) => {
      schedulerData.next();
      schedulerData.setEvents(events);
      forceUpdate();
      updateViewWidth();
    },
    [schedulerData, events, forceUpdate],
  );

  const selectDate = useCallback(
    (schedData, date) => {
      schedulerData.setDate(date);
      schedulerData.setEvents(events);
      forceUpdate();
      updateViewWidth();
    },
    [schedulerData, events, forceUpdate],
  );

  return (
    <Fragment>
      <Scheduler
        schedulerData={schedulerData}
        eventItemClick={eventClicked}
        toggleExpandFunc={toggleExpandFunc}
        onViewChange={onViewChange}
        nextClick={nextClick}
        prevClick={prevClick}
        onSelectDate={selectDate}
      />
    </Fragment>
  );
};
