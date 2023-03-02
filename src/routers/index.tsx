import React from 'react'
import { Route, RouteProps, HashRouter as Router, Routes } from 'react-router-dom'
import NotFound from 'components/NotFound'

// export interface RoutesProps extends RouteProps {
//   key?: string
// }

type RoutesProps = RouteProps & {
  key?: string
}

const ToolTest = React.lazy(() => import(/* webpackChunkName: "toolTest"*/ /*webpackPrefetch: true*/'pages/ToolTest'))

export const routes: RoutesProps[] = [
  {
    path: '/tooltest',
    key: 'tool-test',
    element: <ToolTest />,
    index: true,
  },
]

export default function AppRoutes() {
  return (
    <React.Suspense fallback={null}>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.key} index={route.index} path={route.path} element={route.element} />
          ))}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  )
}
