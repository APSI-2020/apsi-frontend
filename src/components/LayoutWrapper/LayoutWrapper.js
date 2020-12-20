import React from 'react';

import { Col, Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { NavLink } from '../NavLink';

const { Header, Content, Footer } = Layout;

const UserAccountNavigation = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return (
    <div className='navigation--user-wrapper'>
      {isUserLoggedIn && <Link to={'/events/new'}>Nowe wydarzenie</Link>}
      {isUserLoggedIn && <Link to={'/events'}>Wydarzenia</Link>}
      {!isUserLoggedIn && <Link to={'/auth/login'}>Zaloguj</Link>}
      {isUserLoggedIn && <div>Testowy użytkownik</div>}
    </div>
  );
};

const ViewNavigation = () => {
  return (
    <ul className='navigation--view-wrapper'>
      <li>
        <NavLink exact={true} to='/'>
          Main
        </NavLink>
        <NavLink to={'/events'}>Wydarzenia</NavLink>
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
