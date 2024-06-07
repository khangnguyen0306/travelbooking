import React, { useState, useEffect } from "react";
import { Button, Layout, Modal } from "antd";
import "./SecondHeader.scss"; // Import SCSS file
import { MenuOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
// import Imame from "../../../src/assets/icons/laudry-icon.png"
const { Header } = Layout;

const SecondHeader = () => {
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
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const location = useLocation();
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
            <Link to={"/admin"}>
                <div className="header-logo">
                    <p><span style={{ color: 'black' }}>Ta</span><span >bi</span></p>
                </div>
            </Link>

            <a onClick={showModal}><Button type="primary" className="login-btn">Log Out</Button></a>
            <Modal
                title="Logging Out"
                centered
                open={isModalOpen}
                width={300}
                footer={[
                    <Button key="no" onClick={handleCancel}>
                        No
                    </Button>,
                    <Button key="yes" type="primary" onClick={handleOk}>
                        Yes
                    </Button>,
                ]}>
                <p>Are you really want to log out admin ?</p>
            </Modal>
        </Header>

    );
};

export default SecondHeader;
