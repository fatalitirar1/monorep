'use client';

import { UserOutlined, ShoppingCartOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row, Statistic } from 'antd';

const { Content: AntContent } = Layout;


export const MainContent = () => {
  return (
    <AntContent
      style={{
        margin: '24px 16px',
        padding: 24,
        background: '#fff',
        minHeight: 280,
      }}
    >
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Активные пользователи"
              value={1128}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Общие продажи"
              value={93247}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ShoppingCartOutlined />}
              suffix="руб."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Рост"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Дашборд" variant={'borderless'}>
        <p>Добро пожаловать в дашборд вашего приложения!</p>
        <p>Это основная область контента, где вы можете отображать информацию вашего приложения.</p>
      </Card>
    </AntContent>
  );
};