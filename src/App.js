import React from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { dataActionNames } from './reducers/dataReducer/actions';

const App = () => {
  const counter = useSelector((state) => state.dataReducer.counter);
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
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
    </div>
  );
};

export default App;
