"use client";

import React from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../model/useAuth';

import styles from './LoginForm.module.css'

const { Title, Text } = Typography;

export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  onRegister,
}) => {
  const [form] = Form.useForm();
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password, values.remember);
      onSuccess?.();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Вход в аккаунт</Title>
            <Text type="secondary">Введите ваши данные для входа</Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль' },
                { min: 6, message: 'Пароль должен быть не менее 6 символов' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Войти
              </Button>
            </Form.Item>

            {error && (
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Text type="danger">{error}</Text>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="link" onClick={onForgotPassword} style={{ padding: 0 }}>
                Забыли пароль?
              </Button>
              <Button type="link" onClick={onRegister} style={{ padding: 0 }}>
                Создать аккаунт
              </Button>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};
