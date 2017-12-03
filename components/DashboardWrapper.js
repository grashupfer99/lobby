import { Layout, Menu, Icon } from "antd";
import Link from "next/link";
import Router from "next/router";

import Search from "../pages/dashboard/search";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    currentPanel: null,
    selectedKey: "0"
  };

  navItems = [
    {
      name: "Panel Główny",
      href: "/dashboard",
      icon: "pie-chart"
    },
    {
      name: "Wyszukiwarka Tematów",
      href: "/dashboard/search",
      icon: "desktop"
    },
    {
      name: "Zglos temat",
      href: "/dashboard/topic",
      icon: "user"
    },
    {
      name: "Ustawienia",
      href: "/dashboard/profile",
      icon: "setting"
    },
    {
      name: "Logout",
      href: "/dashboard/logout",
      icon: "logout"
    }
  ];

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderNavItem({ name, icon, href, action }, key) {
    return (
      <Menu.Item key={key}>
        <Icon type={icon} />
        <span>
          <a style={{ color: "white" }}>{name}</a>
        </span>
      </Menu.Item>
    );
  }

  getCurrentKey() {
    let key = 0;

    this.navItems.forEach((item, index) => {
      if (
        typeof window === "object" &&
        item.href === window.location.pathname
      ) {
        key = index;
      }
    });

    return String(key);
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            selectedKeys={[this.getCurrentKey()]}
            mode="inline"
            onSelect={e => {
              Router.push({
                pathname: this.navItems[e.key].href
              });

              this.setState({
                selectedKey: e.key
              });
            }}
          >
            {this.navItems.map(this.renderNavItem)}
          </Menu>
        </Sider>
        {this.props.children}
      </Layout>
    );
  }
}

export default Dashboard;
