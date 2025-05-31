import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  FileTextOutlined,
  BookOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/UserProvider';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function Sidebar() {
  const { user, loading } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Helper function to make main menu labels bold
  const boldLabel = (text: string) => (
    <span style={{ fontWeight: 'bold' }}>{text}</span>
  );

  const menuItems: MenuItem[] = [
    getItem(
      boldLabel('Dashboards'),
      'dashboards',
      undefined,
      [
        getItem(
          <Link to='/dashboard'>Overview</Link>,
          '/dashboard',
          <DashboardOutlined />,
        ),
        getItem('Calendar', '/calendar', <CalendarOutlined />),
        getItem('Schedule Actions', '/schedule', <ClockCircleOutlined />),
        getItem('Live Alerts', '/alerts', <AlertOutlined />),
      ],
      'group',
    ),

    getItem(
      boldLabel('Blogs'),
      'blogs',
      undefined,
      [
        getItem(<Link to='/blogs'>All</Link>, '/blogs', <FileTextOutlined />),
        getItem('Latest', '/blogs-latest', <FileTextOutlined />),
        getItem('Archived', '/blogs-archived', <FileTextOutlined />),
      ],
      'group',
    ),

    getItem(boldLabel('Documentation'), 'docs', <BookOutlined />, [
      // submenu items here
    ]),
    getItem(boldLabel('Reports'), 'reports', <BarChartOutlined />, [
      // submenu items here
    ]),
    getItem(boldLabel('Need Help?'), 'help', <QuestionCircleOutlined />, [
      // submenu items here
    ]),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      trigger={null}
      width={260}
      style={{
        backgroundColor: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}>
      {/* Top Logo Bar */}
      <div
        style={{
          backgroundColor: '#2f54eb',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}>
        {!collapsed && (
          <img
            src='/assets/images/logo.png'
            alt='Logo'
            style={{ height: 30 }}
          />
        )}
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{ color: '#fff', fontSize: 18 }}
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <MenuFoldOutlined
            style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}
            onClick={() => setCollapsed(true)}
          />
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div style={{ textAlign: 'center', padding: '24px 16px' }}>
          <Avatar
            src={user?.avatar || '/assets/images/avatar.png'}
            size={64}
            alt='User avatar'
          />
          <div style={{ marginTop: 8, fontWeight: 600 }}>
            {loading ? 'Loading...' : user?.name || 'Allie Simon'}
          </div>

          <Button type='primary' icon={<RadarChartOutlined />}>
            Live metrics
          </Button>
        </div>
      )}

      {/* Navigation */}
      <Menu
        mode='inline'
        selectedKeys={[location.pathname]}
        style={{ border: 'none', background: 'transparent' }}
        items={menuItems}
        defaultOpenKeys={['docs', 'reports', 'help']}
      />
    </Sider>
  );
}

export default Sidebar;
