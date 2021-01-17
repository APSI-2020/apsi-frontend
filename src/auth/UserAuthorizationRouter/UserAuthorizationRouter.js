import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { LayoutWrapper } from '../../components';
import { loginUserWithSSO, userData, userLoggedIn } from '../../reducers';
import { useRedirect } from '../../utils';
import { Login } from '../Login';
import { Register } from '../Register';

export const UserAuthorizationRouter = () => {
  const { url } = useRouteMatch();
  const token = useSelector((state) => state.auth.token);
  const [, redirectTo] = useRedirect();
  const dispatch = useDispatch();

  useEffect(() => {
    const qs = require('query-string');
    const parsed = qs.parse(window.location.search);

    if (parsed['access_token']) {
      dispatch(loginUserWithSSO(parsed)).then(() => {
        redirectTo();
      });
    }

    if (token !== null) {
      //auto sign in
      dispatch(userLoggedIn(token));
      dispatch(userData());
      redirectTo();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <LayoutWrapper>
      <Switch>
        <Route path={`${url}/login`} exact component={Login} />
        <Route path={`${url}/register`} exact component={Register} />
      </Switch>
    </LayoutWrapper>
  );
};
