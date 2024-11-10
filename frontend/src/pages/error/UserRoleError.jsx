import React from "react";
import { Layout, Result } from "antd";

import TopMenu from "../dashboard/TopMenu.jsx";
import LeftMenu from "../dashboard/LeftMenu.jsx";

import "../../css/UserRoleError.css";

const { Header } = Layout;

const UserRoleError = () => {
  return (
    <Layout>
      <Header className="home-header-error">
        <TopMenu />
      </Header>
      <Layout>
        <Layout.Sider>
          <LeftMenu />
        </Layout.Sider>
        <Layout.Content className="layout-content-error">
          <Result
            status="403"
            title="403"
            subTitle="Lo sentimos, tu no estás autorizado con el rol de Administrador para acceder a esta página."
          />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default UserRoleError;
