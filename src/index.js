import { ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // import BrowserRouter
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStandaloneToast } from '@chakra-ui/react'
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const { ToastContainer } = createStandaloneToast()

root.render(
  <>
    <Provider store={store}>
      <ColorModeScript />
      <BrowserRouter> {/* wrap App component inside BrowserRouter */}
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </>
);

serviceWorker.unregister();
