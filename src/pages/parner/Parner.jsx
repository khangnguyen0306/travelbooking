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

const Parner = () => {
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
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/parner" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/parner">View Booking</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item className="dashboard-content-sider-menu-item" key="/parner/manage-hotel" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                            <Link to="/parner/manage-hotel">Manage Hotel</Link>
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

export default Parner