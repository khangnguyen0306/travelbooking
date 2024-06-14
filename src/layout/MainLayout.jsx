import { Outlet } from "react-router-dom";
import { Layout, theme, } from "antd";
import CustomHeader from "../components/Header/CustomHeader";
import CustomFooter from "../components/Footer/CustomFooter";
import { ImportFile } from "../assets/importSVG";

const { Content } = Layout;

const MainLayout = () => {
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
          minHeight: 500,
          background: ImportFile.Background,
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
