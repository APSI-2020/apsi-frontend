import React, { Fragment, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const EventNew = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserLoggedIn) {
      history.goBack();
    }
  }, [dispatch, isUserLoggedIn]);

  const onSubmit = () => {
    console.log('Fomr submitted');
  };

  return (
    <form>
      <h1>Hello</h1>
      <p>Enter your name:</p>
      <input type='text' />
    </form>
  );
};
