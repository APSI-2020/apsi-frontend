import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';

import { LayoutWrapper } from '../../components';
import { userLoggedIn } from '../../reducers';
import { Login } from '../Login';
import { Register } from '../Register';

export const UserAuthorizationRouter = () => {
  const { url } = useRouteMatch();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      //auto sign in
      dispatch(userLoggedIn(token));
      history.push('/');
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
