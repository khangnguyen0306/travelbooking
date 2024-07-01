import React from "react";
import "./CustomHeader.scss";
import { Dropdown, Space, Avatar, notification } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../slices/auth.slice";

const CustomHeader = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedKey = location.pathname;
    const fullName = useSelector(state => state.auth.fullName);
    const token = useSelector(state => state.auth.token);

    const handleLogout = () => {
        dispatch(logOut());
        notification.success({
            message: "Logout successfully",
            description: "See you again!",
        });
        navigate("/login");
    };

    const items = [
        { label: <Link to="/user/booking">My Booking</Link>, key: '0' },
        { type: 'divider' },
        { label: <Link to="/user/profile">Edit Profile</Link>, key: '1' },
        { label: <Link to="/user/change-password">Change Password</Link>, key: '2' },
        { type: 'divider' },
        { label: <Link onClick={handleLogout}>Logout</Link>, key: '3' },
    ];

    const renderProfileDropdown = () => (
        <Dropdown menu={{ items }} trigger={['click']}>
            <Space>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                />
                <p>{fullName} <DownOutlined /></p>
            </Space>
        </Dropdown>
    );

    return (
        <header id="header">
            <Link to="/" className="header-logo">
                <span>Ta</span><span>bi</span>
            </Link>
            <div className="header-link">
                <Link className={`link-item ${selectedKey === "/" && "isSelected"}`} to="/">Home</Link>
                <Link className={`link-item ${selectedKey === "/view-hotels" && "isSelected"}`} to="/view-hotels">View Hotels</Link>
            </div>
            <div className="header-actions">
                {token ? renderProfileDropdown() : (
                    <Link to='/login' className="login-btn">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default CustomHeader;
