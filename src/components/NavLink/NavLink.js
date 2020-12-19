import React from 'react';

import { NavLink as ReactRouterNavLink } from 'react-router-dom';

export const NavLink = ({ children, ...props }) => {
  return (
    <ReactRouterNavLink
      className='navlink'
      activeClassName='navlink__selected'
      {...props}
    >
      {children}
    </ReactRouterNavLink>
  );
};
