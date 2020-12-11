import React from 'react';

import { Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
export const LayoutWrapper = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Link style={{ color: 'white' }} to={'/auth/login'}>
          Zaloguj
        </Link>
      </Header>
      <Content className='layout-wrapper--content' style={{ padding: '0 20px' }}>
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
