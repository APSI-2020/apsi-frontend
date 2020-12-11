import React from 'react';

import { Route } from 'react-router-dom';

import { LayoutWrapper } from '../LayoutWrapper';

export const LayoutRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        return (
          <LayoutWrapper>
            <Component {...props} />
          </LayoutWrapper>
        );
      }}
    />
  );
};
