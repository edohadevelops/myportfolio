import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RouterConfig from './routes/RouterConfig';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import { TrackProvider } from './context/TrackContext';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TrackProvider>
          <Router>
            <RouterConfig />
          </Router>
        </TrackProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
