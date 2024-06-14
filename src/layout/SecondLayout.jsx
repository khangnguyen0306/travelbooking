import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import SecondHeader from '../components/SecondHeader/SecondHeader';
import { ImportFile } from "../assets/importSVG";

const { Content } = Layout;

const SecondLayout = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <SecondHeader></SecondHeader>
            <Content
                style={{
                    padding: '20px 2%',
                    display: "flex",
                    minHeight: "calc(100vh - 60px)",
                    background: ImportFile.Background,
                    borderRadius: borderRadiusLG,
                    marginTop: '60px',
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