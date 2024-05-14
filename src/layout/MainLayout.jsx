import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Badge,
  Dropdown,
  Space,
} from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import CustomHeader from "../components/Header/CustomHeader";
import CustomFooter from "../components/Footer/CustomFooter";
import { ImportFile } from "../assets/importSVG";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatcher = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  return (
    <Layout
      id="layout-body"
    >
      <CustomHeader />
      <Content
        style={{
          display: "flex",
          margin: "0px 16px",
          // padding: 50,
          minHeight: 500,
          // background: other.colorBorderSecondary,
          background: ImportFile.background,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
      <CustomFooter />
    </Layout>

  );
};

export default MainLayout;
