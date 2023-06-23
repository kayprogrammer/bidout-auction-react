import { ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // import BrowserRouter
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStandaloneToast } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const { ToastContainer } = createStandaloneToast()

root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeScript />
        <BrowserRouter> {/* wrap App component inside BrowserRouter */}
          <App />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);

serviceWorker.unregister();
