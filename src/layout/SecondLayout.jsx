import React from 'react';
import {
    SolutionOutlined,
    EditOutlined,
    PoweroffOutlined, LaptopOutlined, NotificationOutlined, UserOutlined
} from '@ant-design/icons';
import { TbPasswordUser } from "react-icons/tb";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SecondHeader from '../components/SecondHeader/SecondHeader';
import { ImportFile } from "../assets/importSVG";

const { Header, Content, Footer, Sider } = Layout;


const SecondLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>

            <SecondHeader></SecondHeader>

            <Content
                style={{
                    padding: '0px 48px 60px 48px',
                    display: "flex",
                    minHeight: 500,
                    background: ImportFile.background,
                    borderRadius: borderRadiusLG,
                    marginTop: '8%',
                }}
            >
                <Layout>
                    <Outlet />
                </Layout>
            </Content>

        </Layout>
    );
};
export default SecondLayout;