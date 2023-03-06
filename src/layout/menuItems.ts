import React from 'react'
import { DesktopOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

// type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuProps['items'] = [
  {
    key: '/template',
    icon: React.createElement(DesktopOutlined),
    label: '一级菜单',
    children: [
      {
        key: '/template/page1', // key is use for router path
        label: '二级菜单1',
      },
      {
        key: '/template/page2', // key is use for router path
        label: '二级菜单2',
      },
    ],
  },
  // {
  //   key: '/task/list',
  //   icon: React.createElement(VideoCameraOutlined),
  //   label: '任务列表',
  // },
  // {
  //   key: '/setting',
  //   icon: React.createElement(SettingOutlined),
  //   label: '设置',
  //   children: [
  //     {
  //       key: '/setting/authManage', // key is use for router path
  //       label: '权限管理',
  //     },
  //   ],
  // },
]

export default menuItems
