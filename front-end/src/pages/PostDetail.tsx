import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Spin, message, Modal } from 'antd';
import axios from 'axios';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  image: string;
}

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/post/${id}`)
      .then((res) => {
        setPost(res.data);
        form.setFieldsValue(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error('Failed to load post');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onFinish = (values: { title: string; body: string }) => {
    if (!id) return;

    setSubmitting(true);
    axios
      .put(`${import.meta.env.VITE_JSON_PLACEHOLDER}/posts/${id}`, values)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          message.success('Post updated successfully (simulated)');
          setTimeout(() => navigate('/blogs'), 100); // ensure toast shows before redirect
        } else {
          message.error('Unexpected response from server');
        }
      })
      .catch(() => {
        message.error('Failed to update post');
      })
      .finally(() => setSubmitting(false));
  };

  const onDelete = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This is a simulated delete. It will not affect real data.',
      okText: 'Yes, delete it',
      cancelText: 'Cancel',
      onOk: () => {
        message.success('Post deleted (simulated)');
        setTimeout(() => navigate('/blogs'), 100); // small delay to ensure toast renders
      },
    });
  };

  if (loading) return <Spin />;

  if (!post) return <div>Post not found.</div>;

  return (
    <div
      style={{
        maxWidth: 600,
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        margin: '0 auto',
      }}>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item label='Title' name='title' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Body' name='body' rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={submitting}
            style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button danger onClick={onDelete}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostDetail;
