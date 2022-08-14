import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import { ShopContenxtProvider } from './components/ShopContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { GlobalContextProvider } from './components/GlobalContext';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
