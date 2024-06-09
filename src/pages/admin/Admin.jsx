import React from 'react';
import {
    SolutionOutlined,
    EditOutlined,
    OrderedListOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { TbPasswordUser } from "react-icons/tb";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

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
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/booking" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/booking">View Booking</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/user" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/user">View User</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/view-partner" icon={<OrderedListOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/view-partner">View Partner</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/view-amenities" icon={<OrderedListOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/view-amenities">View Amenities</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/confirm-rental" icon={<CheckCircleOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/admin/confirm-rental">Rental Registration</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        {/* <Menu.Item className="dashboard-content-sider-menu-item" key="/admin" icon={<TbPasswordUser style={{ fontSize: '20px' }} />}>
                        <Link to="/admin/">Change Password</Link>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item className="dashboard-content-sider-menu-item" key="/admin/" icon={<PoweroffOutlined style={{ fontSize: '20px' }} />}>
                        <a >Log Out</a>
                    </Menu.Item> */}
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