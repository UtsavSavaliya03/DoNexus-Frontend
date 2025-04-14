import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { ConfigProvider } from 'antd';
import { Toaster } from 'react-hot-toast';
import SessionManager from './components/sessionManager/SessionManager.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRoutes = () => {
  return useRoutes(App)
}

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#6F42C1' } }}>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ duration: 4000 }}
          />
          <SessionManager />
          <AppRoutes />
        </ConfigProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();