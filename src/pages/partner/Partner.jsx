import React from 'react';
import {
    SolutionOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Content, Sider } = Layout;

const Partner = () => {
    const location = useLocation();

    const determineActiveKey = (path) => {
        if (path.startsWith('/partner/manage-hotel')) {
            return '/partner/manage-hotel';
        }
        return path;
    };

    const selectedKey = determineActiveKey(location.pathname);
    const {
        token: { colorBgContainer, borderRadiusLG, ...other },
    } = theme.useToken();
    return (
        <div>
            <Layout
                style={{
                    padding: '24px 0',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Sider
                    style={{
                        background: colorBgContainer,
                    }}
                    width={200}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[selectedKey]}
                        style={{
                            height: '100%',
                        }}
                    >
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/partner" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/partner">View Booking</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/partner/manage-hotel" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/partner/manage-hotel">Manage Hotel</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>

        </div>
    )
}

export default Partner