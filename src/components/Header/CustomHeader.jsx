import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, Drawer, Grid, Dropdown, Space } from "antd";
import "./CustomHeader.scss"; // Import SCSS file
import { MenuOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
// import Imame from "../../../src/assets/icons/laudry-icon.png"
const { Header } = Layout;
const { useBreakpoint } = Grid;

const items = [
    {
        label: <a>-----</a>,
        key: '0',
    },
    {
        label: <a href="/user/dashboard">Dashboard</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: <a href="/user/profile">Edit Profile</a>,
        key: '3',
    },
    {
        type: 'divider',
    },
    {
        label: <a href="/user/change-password">Change Password</a>,
        key: '4',
    },
];
const CustomHeader = () => {
    const screens = useBreakpoint();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();
    const selectedKey = location.pathname;
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <Header id="header" className={visible ? "show" : "hidden"} style={{ zIndex: '1100' }}>
            <Link to={"/"}>
                <div className="header-logo">
                    <p><span style={{ color: 'black' }}>Ta</span><span >bi</span></p>
                </div>
            </Link>
            {screens.md ? (
                <>
                    <Menu className="menu" mode="horizontal" selectedKeys={[selectedKey]}>
                        <Menu.Item key="/" className="item">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/view-hotels" className="item">
                            <Link to="/view-hotels">View Hotels</Link>
                        </Menu.Item>
                    </Menu>
                    <div className="profile-btn">
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space >
                                    Click me
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <Link to='/login/member'>
                        <Button type="primary" className="login-btn">Login</Button>
                    </Link>
                </>
            ) : (
                <Button className="menu-btn" onClick={() => setDrawerVisible(true)} style={{ marginRight: '40px' }}>
                    <MenuOutlined />
                </Button>
            )}
            <Drawer
                title="Navigation"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={["1"]}
                    style={{ width: '100%' }}
                    onClick={() => setDrawerVisible(false)}
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <SubMenu key="2" title="Pages">
                        <Menu.Item key="2-1">
                            <Link to="/destination">Destination</Link>
                        </Menu.Item>
                        <Menu.Item key="2-2">
                            <Link to="/about">About Us</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                        <Link to="admin">Tour List</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/"> Room List </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="home">Tour Search</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="admin">Blog</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Header>
    );
};

export default CustomHeader;
