import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Drawer, Grid } from "antd";
import "./CustomHeader.scss"; // Import SCSS file
import { MenuOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
// import Imame from "../../../src/assets/icons/laudry-icon.png"
const { Header } = Layout;
const { useBreakpoint } = Grid;

const CustomHeader = () => {
    const screens = useBreakpoint();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);

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
        <Header id="header" className={visible ? "show" : "hidden"} style={{ zIndex: '1' }}>
            <Link to={"/"}>
                <div className="header-logo">
                    <p><span style={{ color: 'black' }}>Travel</span> <span >Tour</span></p>
                </div>
            </Link>
            {screens.md ? (
                <>
                    <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={{ width: 'fit-content', backgroundColor: 'none' }}>
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
                            <Link to="/hotel-list"> Search Hotel </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="home">Tour Search</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="admin">Blog</Link>
                        </Menu.Item>
                    </Menu>
                    <Button type="primary" className="login-btn">Login</Button>
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
                visible={drawerVisible}
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
