import React, { useState, useEffect } from "react";
import "./SecondHeader.scss"; // Import SCSS file
import { Button, Modal, notification } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from "../../slices/auth.slice";
import { useDispatch } from "react-redux";

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

    const location = useLocation();

    let logoText;
    if (location.pathname.startsWith("/partner")) {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: 'whitesmoke' }}>bi</span>'s Partner</p>;
    } else if (location.pathname.startsWith("/admin")) {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: 'whitesmoke' }}>bi</span>'s Admin</p>;
    } else {
        logoText = <p><span style={{ color: 'black' }}>Ta</span><span style={{ color: 'whitesmoke' }}>bi</span></p>;
    }

    return (
        <header id="second-header">
            <div className="header-logo">
                {logoText}
            </div>
            <button className="logout-btn" onClick={showModal}>Log Out</button>
            <Modal
                title="Logging Out"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
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
        </header>
    );
};

export default SecondHeader;
