import React, { useEffect, useState } from 'react';
import { List, Tabs, Typography, Button, Pagination, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserProvider';
import axios from 'axios';
import BlogHeaderCard from '../components/BlogHeaderCard';

const { Title } = Typography;

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  image: string;
}

function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = import.meta.env.VITE_PAGE_SIZE;

  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!user) return;
    fetchPosts(1);
  }, [user]);

  const fetchPosts = (page: number) => {
    if (!user) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${user.id}/posts`, {
        params: { page, pageSize },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setTotal(res.data.total);
        setCurrentPage(page);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const onPageChange = (page: number) => {
    fetchPosts(page);
  };

  if (loading || userLoading) return <Spin />;

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <BlogHeaderCard />

        <Button>Filter/Sort by</Button>
      </div>

      <Tabs
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'All Posts',
            children: (
              <>
                <List
                  itemLayout='vertical'
                  dataSource={posts}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        padding: '16px 0',
                        borderBottom: '1px solid #f0f0f0',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/posts/${item.id}`)}
                      key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <img
                            src={item.image}
                            alt='post'
                            style={{
                              width: 100,
                              height: 72,
                              borderRadius: 8,
                              objectFit: 'cover',
                            }}
                          />
                        }
                        title={
                          <span style={{ fontSize: 15, fontWeight: 600 }}>
                            {item.title}
                          </span>
                        }
                        description={
                          <>
                            <div style={{ fontSize: 13, color: '#555' }}>
                              {item.body.substring(0, 100)}...
                            </div>
                            <div
                              style={{
                                color: '#1677ff',
                                fontSize: 13,
                                fontWeight: 500,
                              }}>
                              Read more
                            </div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <Pagination
                    total={total}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={onPageChange}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ),
          },
          {
            key: '2',
            label: 'Latest Posts',
            disabled: true,
          },
          {
            key: '3',
            label: 'Archived',
            disabled: true,
          },
        ]}
      />
    </div>
  );
}

export default Blogs;
