import React, { useEffect, useState } from 'react'
import { ConfigProvider, Layout, Menu, Button, Dropdown, Tag } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import style from './index.module.scss'
import menuItems from './menuItems'
import logoPng from 'assets/imgs/logo.png'
import { getRealName, removeStoreByLogout } from 'utils/auth'
import EnvSelect from 'components/EnvSelect'

const { Header, Sider, Content } = Layout

const DefaultLayout: React.FunctionComponent<unknown> = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const realName = getRealName()

  const handleLogout = () => {
    removeStoreByLogout()
    const { origin, pathname } = window.location
    window.location.href = `${origin}${pathname}#/login`
    location.reload()
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const getMenuItems = () => {
    const WHITE_LIST_OF_SUPER_ADMIN: Array<string> = ['/setting']
    // if (isAdmin()) return menuItems
    // 非超级管理员不显示setting导航
    return menuItems?.filter((item) => !WHITE_LIST_OF_SUPER_ADMIN.includes(String(item?.key)))
  }

  useEffect(() => {
    if (pathname === '/') {
      navigate('/contract/list')
    }
    setSelectedKeys([pathname])
  }, [pathname, navigate])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6C57FF',
        },
      }}>
      <Layout className={style.site}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={style.logo}>
            <img className={style.logoImg} src={logoPng} alt='' />
            {/* todo */}
            <span className={style.logoText} style={{ display: collapsed ? 'none' : 'inline-block' }}>
              My Title
            </span>
          </div>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={selectedKeys}
            defaultOpenKeys={['/template']} //todo
            items={getMenuItems()}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout className={style.siteLayout}>
          <Header className={style.siteLayoutHeader} style={{ padding: 0 }}>
            <div>
              <span onClick={() => setCollapsed(!collapsed)} className={style.trigger}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </span>
              {/* <Tag color='red' className={style.envTag}>
                {EnvOptions.find((item) => item.value === process.env.REACT_APP_ENV)?.label}
              </Tag> */}
              <EnvSelect />
            </div>

            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <a onClick={handleLogout} href='javascript:void 0'>
                        退出登录
                      </a>
                    ),
                  },
                ],
              }}
              placement='bottom'>
              <Button className={style.usernameBtn}>{realName}</Button>
            </Dropdown>
          </Header>
          <Content
            className={style.siteLayoutContent}
            style={{
              padding: 24,
              margin: '24px 16px',
            }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default DefaultLayout
