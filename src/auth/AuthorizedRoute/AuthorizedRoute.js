import React from 'react';

import { useSelector } from 'react-redux';
import { useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';

import { LayoutWrapper } from '../../components';

export const AuthorizedRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = useSelector((state) => state.authDb.isUserLoggedIn);
  const { url } = useRouteMatch();
  const location = useLocation();
  const currentLocation = location.pathname + location.search;
  return (
    <Route
      {...props}
      render={(props) => {
        if (!isLoggedIn)
          return <Redirect to={`${url}auth/login?redirect=${currentLocation}`} />;

        return (
          <LayoutWrapper>
            <Component {...props} />
          </LayoutWrapper>
        );
      }}
    />
  );
};
