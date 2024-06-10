import "./DashBoard.scss";
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                        <Menu className="dashboard-content-sider-menu" theme="light" selectedKeys={[selectedKey]} mode="inline" >

                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/booking" icon={<SolutionOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/booking">My Booking</Link>
                            </Menu.Item>
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/profile" icon={<EditOutlined style={{ fontSize: '20px' }} />}>
                                <Link to="/user/profile">Edit Profile</Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/change-password" icon={<TbPasswordUser style={{ fontSize: '20px' }} />}>
                                <Link to="/user/change-password">Change Password</Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item className="dashboard-content-sider-menu-item" key="/user/logout" icon={<PoweroffOutlined style={{ fontSize: '20px' }} />}>
                                <a onClick={showModal}>Log Out</a>
                            </Menu.Item>
                        </Menu>
                        <Modal title="Logging Out" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={300}>
                            <p>Oh, no! You’ll miss a lot of things by logging out: Refund Booking and other member-only benefits. Are you sure want to log out?</p>
                        </Modal>

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