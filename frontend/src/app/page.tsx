'use client';

import { Layout } from 'antd';

import { Header, Sidebar, Footer, MainContent } from '@/widgets/layout';



export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 250, minHeight: '100vh' }}>
        <Header />
        <MainContent />

        {/* <Content style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Active Users"
                  value={1128}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<UserOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Sales"
                  value={93247}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ShoppingCartOutlined />}
                  suffix="USD"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Growth"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Card title="Dashboard" bordered={false}>
            <p>Welcome to your application dashboard!</p>
            <p>This is the main content area where you can display your application content.</p>
          </Card>
        </Content> */}

        <Footer />
      </Layout>
    </Layout>
  );
}
