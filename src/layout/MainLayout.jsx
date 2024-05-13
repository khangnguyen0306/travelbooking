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

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatcher = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  const location = useLocation();

  const siderList = useSider();
  return (
    <Layout

    >
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: "100%",
            padding: "16px",
            flex: 1,
          }}
        >
          <Menu
            style={{
              borderRadius: borderRadiusLG,
              height: "100%",
              boxShadow: other.boxShadow,
              background: other.colorBgBlur,
              color: other.colorTextLightSolid,
            }}
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname.substring(1)]}
            items={[
              ...siderList.map((item) => {
                return {
                  ...item,
                  key: item.href,
                  label: <Link to={item.href}>{item.label}</Link>,
                };
              }),
            ]}
          />
        </div>
      </Sider> */}

      {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
        > */}
      {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}
      {/* <Badge.Ribbon
            color={"pink"}
            text={
              <span
                style={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                test
              </span>
            }
          >
            <Dropdown
              dropdownRender={(menu) => (
                <div
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "2px",
                  }}
                >
                  <Space direction="vertical">
                    <Button
                      type={"dashed"}
                      icon={<LogoutOutlined />}
                      // onClick={() => {
                      //   dispatcher(clearUser());
                      // }}
                    >
                      Log out
                    </Button>
                  </Space>
                </div>
              )}
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{
                  marginLeft: "auto",
                }}
              />
            </Dropdown>
          </Badge.Ribbon> */}
      {/* </Header> */}
      <CustomHeader />
      <Content
        style={{
          display: "flex",
          margin: "75px 16px",
          padding: 50,
          minHeight: 500,
          background: other.colorBorderSecondary,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </Layout>

  );
};

export default MainLayout;
