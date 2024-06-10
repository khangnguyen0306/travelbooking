import React, { useState, useEffect } from "react";
import { Button, Layout, Modal, notification } from "antd";
import "./SecondHeader.scss"; // Import SCSS file
import { MenuOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logOut } from "../../slices/auth.slice";
import { useDispatch } from "react-redux";
// import Imame from "../../../src/assets/icons/laudry-icon.png"
const { Header } = Layout;

const SecondHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(logOut());
        notification.success({
            message: "Logout successfully",
            description: "See you again!",
        });
        navigate("/login")

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



    let logoText;
    if (location.pathname.startsWith("/partner")) {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: '#1677ff' }}>bi</span>'s Partner</p>;
    } else if (location.pathname.startsWith("/admin")) {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: '#1677ff' }}>bi</span>'s Admin</p>;
    } else {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: '#1677ff' }}>bi</span></p>;
    }

    return (
        <Header id="header" className={visible ? "show" : "hidden"} style={{ zIndex: '1100' }}>
            <div className="header-logo">
                {logoText}
            </div>


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
                <p>Are you really want to log out ?</p>
            </Modal>
        </Header>

    );
};

export default SecondHeader;
