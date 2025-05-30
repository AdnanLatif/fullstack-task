import React from 'react';
import { MessageOutlined, StarFilled } from '@ant-design/icons';

const BlogHeaderCard: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f5f7fa',
        padding: '16px 24px',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        marginBottom: 24,
      }}>
      <div
        style={{
          backgroundColor: '#2f54eb',
          borderRadius: 12,
          width: 56,
          height: 56,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }}>
        <MessageOutlined style={{ fontSize: 30, color: 'white' }} />
        <StarFilled
          style={{
            fontSize: 12,
            color: '#2f54eb',
            background: 'white',
            borderRadius: '50%',
            position: 'absolute',
            bottom: 14,
            right: 12,
            padding: 2,
          }}
        />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>
          All Blog posts
        </div>
        <div style={{ fontSize: 13, color: '#888' }}>
          Qatar Development Bank
        </div>
      </div>
    </div>
  );
};

export default BlogHeaderCard;
