import { ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // import BrowserRouter
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <ColorModeScript />
      <BrowserRouter> {/* wrap App component inside BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </>
);

serviceWorker.unregister();
