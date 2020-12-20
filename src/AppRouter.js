import React from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { UserAuthorizationRouter } from './auth';
import { LayoutRoute, AuthorizedRoute } from './components';
import logo from './logo.svg';
import { dataActionNames } from './reducers/dataReducer/actions';
import { EventsView, EventView, EventNew } from './views';

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
  return (
    <Switch>
      <Route path={`${url}auth/`} component={UserAuthorizationRouter} />
      <AuthorizedRoute path={'/events/new'} component={EventNew} />
      <AuthorizedRoute path={'/events'} component={EventsView} />
      <AuthorizedRoute path={'/events/:id'} component={EventView} />
      <LayoutRoute path={'/'} exact component={Main} />
    </Switch>
  );
};
