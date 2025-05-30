import React from 'react';
import { Input, Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  PlusOutlined,
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import PostDetail from './pages/PostDetail';

const { Content, Header } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 64,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
          <Input
            placeholder='Type here to search...'
            prefix={<SearchOutlined style={{ color: '#aaa' }} />}
            style={{
              borderRadius: 6,
              fontSize: 14,
              width: 240,
              height: 40,
            }}
          />
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <PlusOutlined style={{ fontSize: 18 }} />
            <BellOutlined style={{ fontSize: 18 }} />
            <MessageOutlined style={{ fontSize: 18 }} />
            <img
              src='/assets/images/avatar.png'
              alt='profile'
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          </div>
        </Header>

        <Content style={{ padding: '24px 32px', background: '#f5f7fa' }}>
          <Routes>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/posts/:id' element={<PostDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
