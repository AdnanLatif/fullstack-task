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

  const menuItems: MenuItem[] = [
    getItem(
      'Dashboards',
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
      'Blogs',
      'blogs',
      undefined,
      [
        getItem(<Link to='/blogs'>All</Link>, '/blogs', <FileTextOutlined />),
        getItem('Latest', '/blogs-latest', <FileTextOutlined />),
        getItem('Archived', '/blogs-archived', <FileTextOutlined />),
      ],
      'group',
    ),

    getItem(
      '',
      'more',
      undefined,
      [
        getItem('Documentation', '/docs', <BookOutlined />),
        getItem('Reports', '/reports', <BarChartOutlined />),
        getItem('Need Help?', '/help', <QuestionCircleOutlined />),
      ],
      'group',
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
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
          <Avatar src='/assets/images/avatar.png' size={64} />
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
      />
    </Sider>
  );
}

export default Sidebar;
