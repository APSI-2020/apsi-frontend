import React, { useEffect } from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { UserAuthorizationRouter } from './auth';
import { LayoutRoute, AuthorizedRoute } from './components';
import logo from './logo.svg';
import { dataActionNames } from './reducers/dataReducer/actions';
import { CalendarView, EventsView, EventView, EventNew, PaymentView } from './views';

const Main = () => {
  const counter = useSelector((state) => state.dataReducer.counter);
  const dispatch = useDispatch();
  return (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='log' />
      <p>
        APSI <code>frontend</code> project
      </p>
      <div>{counter}</div>
      <Button
        type='primary'
        onClick={() =>
          dispatch({
            type: dataActionNames.COUNTER_INCREASED,
            increaseValue: 1,
          })
        }
      >
        Test button
      </Button>
    </header>
  );
};

export const AppRouter = () => {
  let { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      history.push(
        `/auth/login${
          history.location.search ? history.location.search : 'redirect=/'
        }`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route path={`${url}auth/`} component={UserAuthorizationRouter} />
      <AuthorizedRoute path={'/events/new'} component={EventNew} />
      <AuthorizedRoute exact path={'/events'} component={EventsView} />
      <AuthorizedRoute path={'/events/:id'} component={EventView} />
      <AuthorizedRoute path={'/calendar'} component={CalendarView} />
      <AuthorizedRoute path={`${url}payments/:eventId`} component={PaymentView} />
      <LayoutRoute path={'/'} exact component={Main} />
    </Switch>
  );
};
