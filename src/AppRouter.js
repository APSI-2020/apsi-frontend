import React from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import logo from './logo.svg';
import { dataActionNames } from './reducers/dataReducer/actions';

export const AppRouter = () => {
  let { url } = useRouteMatch();
  const counter = useSelector((state) => state.dataReducer.counter);
  const dispatch = useDispatch();
  return (
    <Switch>
      <Route path={'/'}>
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
      </Route>
    </Switch>
  );
};
