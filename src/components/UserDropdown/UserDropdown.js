import React from 'react';

import { LoadingOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../reducers';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const menuKeys = {
  LOGOUT: 'logout',
};

export const UserDropdown = () => {
  const { firstName, lastName } = useSelector((state) => state.user);
  const loadingData = useSelector((state) => state.user.loadingData);
  const dispatch = useDispatch();

  const onMenuClick = (e) => {
    switch (e.key) {
      case menuKeys.LOGOUT:
        dispatch(signOut());
        break;
      default:
    }
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key={menuKeys.LOGOUT} icon={<LogoutOutlined />}>
        Wyloguj
      </Menu.Item>
    </Menu>
  );

  return (
    <Spin spinning={loadingData} indicator={antIcon}>
      <Dropdown overlay={menu} trigger={['hover', 'click']} placement='bottomCenter'>
        <Button type='link'>
          <Space>
            {firstName}
            {lastName}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Spin>
  );
};
