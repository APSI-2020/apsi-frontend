import React, { useEffect } from 'react';

import { CalendarTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { UserAuthorizationRouter } from './auth';
import { LayoutRoute, AuthorizedRoute } from './components';
import {
  CalendarView,
  EventsView,
  EventView,
  EventNew,
  PaymentView,
  PaymentHistoryView,
} from './views';

const { Title, Text, Paragraph } = Typography;

const Main = () => {
  return (
    <Row style={{ marginTop: '20px' }}>
      <Col span={24}>
        <Title level={1}>System zapisów</Title>
        <Paragraph>
          System ten umożliwia zapisanie się na konkretne wydarzenia. W celu zapisu
          na wydarzenie należy{' '}
          <Button type='link'>
            <Link to='/auth/register'>założyć konto</Link>{' '}
          </Button>{' '}
          lub też zalogować się przy użyciu konta USOS.
        </Paragraph>
        <Title level={3}>
          <CalendarTwoTone style={{ marginRight: '5px' }} twoToneColor='#461da5' />
          Wydarzenia
        </Title>
        <Paragraph>
          Aby wejść na wydarzenie należy pojawić się w miejscu wydarzenia{' '}
          <Text mark={true}>15 minut</Text> przed rozpoczęciem się wydarzenia w celu
          weryfikacji wejściówki. Wejściówki najczęściej sprawdzane są dla wydarzeń{' '}
          <Text underline={true}>płatnych</Text>. Wydarzenia płatne posiadają
          wejściówki umożliwiające wejście dla osób, które zapisły się oraz pomyślnie
          opłaciły wydarzenie.
        </Paragraph>
        <Title level={5}>Tworzenie wydarzeń</Title>
        <Paragraph>
          Wydarzenie mogą tworzyć tylko użytkownicy z odpowiednimi uprawnieniami.
        </Paragraph>
        <Title level={3}>
          <UserOutlined style={{ marginRight: '5px', color: '#461da5' }} />
          Konto
        </Title>
        <Paragraph>Założenie konta w systemie jest bezpłatne.</Paragraph>
      </Col>
    </Row>
  );
};

export const AppRouter = () => {
  let { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      history.push(
        `/auth/login${
          history.location.search ? history.location.search : 'redirect=/'
        }`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route path={`${url}auth/`} component={UserAuthorizationRouter} />
      <AuthorizedRoute path={'/events/new'} component={EventNew} />
      <AuthorizedRoute path={'/payments'} component={PaymentHistoryView} />
      <AuthorizedRoute exact path={'/events'} component={EventsView} />
      <AuthorizedRoute path={'/events/:id'} component={EventView} />
      <AuthorizedRoute path={'/calendar'} component={CalendarView} />
      <AuthorizedRoute path={`${url}payments/:eventId`} component={PaymentView} />
      <LayoutRoute path={'/'} exact component={Main} />
    </Switch>
  );
};
