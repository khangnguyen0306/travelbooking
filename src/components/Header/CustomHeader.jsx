// CustomHeader.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./CustomHeader.scss"; // Import SCSS file

const { Header } = Layout;

const CustomHeader = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

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
        <Header id="header" className={visible ? "show" : "hidden"}>
            {/* <div className="logo" /> */}
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to="/"> Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="home">Home</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="admin">Admin</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default CustomHeader;
