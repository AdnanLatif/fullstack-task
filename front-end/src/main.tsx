import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as AntdApp, message } from 'antd';
import { UserProvider } from './hooks/UserProvider';
import App from './App';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';

message.config({
  top: 80,
  duration: 2,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AntdApp>
        <UserProvider>
          <App />
        </UserProvider>
      </AntdApp>
    </BrowserRouter>
  </React.StrictMode>,
);
