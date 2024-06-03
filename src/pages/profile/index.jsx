import "./DashBoard.scss";
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import {
    SolutionOutlined,
    LaptopOutlined,
    EditOutlined,
    StarOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { TbPasswordUser } from "react-icons/tb";
import { FaFileInvoiceDollar } from "react-icons/fa";
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
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]); const {
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
                    <Sider className="dashboard-content-sider" theme="light" width={300}>
                        <div className="dashboard-content-sider-title">My Account</div>
                        <Menu className="dashboard-content-sider-menu" theme="light" selectedKeys={[selectedKey]} mode="inline" >

                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/dashboard" icon={<LaptopOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/profile" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/profile">Edit Profile</Link>
                            </Menu.Item>
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/change-password" icon={<TbPasswordUser style={{ fontSize: '20px' }} />}>
                                <Link to="/user/change-password">Change Password</Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <div className="dashboard-content-sider-title-inside">Room Booking</div >
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/booking" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/booking">My Booking</Link>
                            </Menu.Item>
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/invoice" icon={<FaFileInvoiceDollar style={{ fontSize: '20px' }} />}>
                                <Link to="/user/invoice">Invoices</Link>
                            </Menu.Item>
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/review" icon={<StarOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/review">Reviews</Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item className="dashboard-content-sider-menu-item" key="7" icon={<PoweroffOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/dashboard">Log Out</Link>
                            </Menu.Item>
                        </Menu>


                    </Sider>
                    <Layout className="dashboard-content-main">

                        <Outlet></Outlet>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}

export default Profile