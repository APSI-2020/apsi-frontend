import React from 'react';

import { Col, Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const UserAccountNavigation = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return (
    <div className='navigation--user-wrapper'>
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
        <NavLink className='navlink' activeClassName='navlink__selected' to='/'>
          Main
        </NavLink>
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
        <Col span={24}>
          <Row
            xs={{ span: 24 }}
            md={{ span: 12, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
          >
            {children}
          </Row>
        </Col>
      </Content>
      <Footer>@APSI 2020</Footer>
    </Layout>
  );
};
