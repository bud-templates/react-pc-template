import React, { ReactNode, Suspense, useEffect } from 'react'
import { Spin } from 'antd'
import { Route, Routes, useNavigate, RouteObject, HashRouter as Router } from 'react-router-dom'
import DefaultLayout from '../layout'
import NotFound from 'components/NotFound'
// import storage from 'utils/customStorage'

type RoutesProps = RouteObject & {
  key?: string
  noNeedLogin?: boolean
}

interface IDefaultLayoutProps {
  children: React.ReactNode | null
  route: RoutesProps
}

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Spin />}>{children}</Suspense>
}

const TemplateTest = React.lazy(
  () => import(/* webpackChunkName: "TemplateTest1"*/ /*webpackPrefetch: true*/ 'pages/TemplateTest'),
)
const Login = React.lazy(() => import(/* webpackChunkName: "login"*/ /*webpackPrefetch: true*/ 'pages/Login'))

export const routes: RoutesProps[] = [
  {
    path: '/template/page1',
    key: 'tool-test',
    element: lazyLoad(<TemplateTest />),
    index: true,
    noNeedLogin: true,
  },
]

const RequireLogin: React.FunctionComponent<IDefaultLayoutProps> = (props) => {
  const { children, route } = props
  //  todo:
  // const token = storage.getItem('token')
  const token = 'true'
  const navigator = useNavigate()

  useEffect(() => {
    const { noNeedLogin } = route || {}
    if (!noNeedLogin && !token) navigator('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return token ? <>{children}</> : null
}

export default function AppRoutes() {
  return (
    <React.Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<DefaultLayout />}>
            {routes.map((route) => {
              return (
                <Route
                  key={route.key}
                  index={route.index}
                  path={route.path}
                  element={<RequireLogin route={route}>{route.element}</RequireLogin>}
                />
              )
            })}
            <Route path='*' element={<NotFound />} />
          </Route>
          {/* {routes.map((route) => (
            <Route key={route.key} index={route.index} path={route.path} element={route.element} />
          ))} */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  )
}
