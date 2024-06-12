import React from 'react';
import {
    SolutionOutlined,
    BarChartOutlined,
    BankOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    WifiOutlined
} from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Content, Sider } = Layout;

const Admin = () => {
    const location = useLocation();
    const selectedKey = location.pathname;
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
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/" icon={<BarChartOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/manage-bookings" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/manage-bookings">Bookings</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/manage-users" icon={<UserOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/manage-users">Users</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/manage-partners" icon={<UsergroupAddOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/manage-partners">Partners</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/manage-hotels" icon={<BankOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/manage-hotels">Hotels</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/manage-conveniences" icon={<WifiOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/manage-conveniences">Conveniences</Link>
                        </Menu.Item>
                        <Menu.Divider />
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

export default Admin