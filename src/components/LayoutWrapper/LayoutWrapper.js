import React from 'react';

import { Col, Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { axios } from '../../utils';
import { NavLink } from '../NavLink';
import { UserDropdown } from '../UserDropdown';

const { Header, Content, Footer } = Layout;

const redirectToSSO = () => {
  axios.get('/sso/get-session').then((response) => {
    const redirectUrl = response.data['redirectUrl'];
    window.location.replace(redirectUrl);
  });
};

const UserAccountNavigation = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  return (
    <div className='navigation--user-wrapper'>
      {!isUserLoggedIn && <Link to={'/auth/login'}>Zaloguj</Link>}
      {!isUserLoggedIn && (
        <Link to={'#'} onClick={redirectToSSO}>
          Uwierzytelnienie USOS
        </Link>
      )}
      {isUserLoggedIn && <UserDropdown />}
    </div>
  );
};

const ViewNavigation = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return (
    <ul className='navigation--view-wrapper'>
      <li>
        <NavLink exact={true} to='/'>
          Main
        </NavLink>
        <NavLink to={'/events'} exact={true}>
          Wydarzenia
        </NavLink>
        <NavLink to={'/payments'} exact={true}>
          Historia Płatności
        </NavLink>
        {isUserLoggedIn && <NavLink to={'/events/new'}>Nowe wydarzenie</NavLink>}
        {isUserLoggedIn && <NavLink to={'/calendar'}>Kalendarz</NavLink>}
      </li>
    </ul>
  );
};

const Navigation = () => {
  return (
    <nav className='navigation'>
      <ViewNavigation />
      <UserAccountNavigation />
    </nav>
  );
};

export const LayoutWrapper = ({ children }) => {
  return (
    <Layout className='layout'>
      <Header className='layout--header layout--header__stick'>
        <Navigation />
      </Header>
      <Content className='layout--content'>
        <Row
          xs={{ span: 24 }}
          md={{ span: 12, offset: 12 }}
          lg={{ span: 10, offset: 12 }}
        >
          <Col span={24}>{children}</Col>
        </Row>
      </Content>
      <Footer className='layout--footer'>@APSI 2020</Footer>
    </Layout>
  );
};
