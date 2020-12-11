import React from 'react';

import { Col, Layout, Row } from 'antd';
const { Header, Content, Footer } = Layout;
export const LayoutWrapper = ({ children }) => {
  return (
    <Layout>
      <Header>
        <h1 style={{ color: 'white' }}>Header</h1>
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
