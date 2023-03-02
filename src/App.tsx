// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import GlobalModel from './model'
import AppRoutes from 'src/routers'
import ErrorBoundary from 'components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <GlobalModel.Provider>
        <AppRoutes />
      </GlobalModel.Provider>
    </ErrorBoundary>
  )
}

export default App
