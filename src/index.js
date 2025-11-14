import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.js'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)