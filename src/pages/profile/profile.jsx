import "./profile.scss";
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LaptopOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { TbPasswordUser } from "react-icons/tb";
const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}




const Profile = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div className='dashboard'>
            <div className="dashboard-title">
                <div>Dashboard</div>
            </div>
            <div className="dashboard-content">

                <Layout

                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Sider theme="light" >
                        <div className="demo-logo-vertical" />
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" >
                            <Menu.Item key="1" icon={<LaptopOutlined />}>
                                <Link to="/dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<EditOutlined />}>
                                <Link to="/dashboard/profile">Edit Profile</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TbPasswordUser />}>
                                <Link to="/dashboard/change-password">Change Password</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="dashboard-content">

                        {/* <Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div
                                style={{
                                    padding: 24,
                                    minHeight: 360,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                
                            </div>
                        </Content> */}
                        <Outlet></Outlet>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}

export default Profile