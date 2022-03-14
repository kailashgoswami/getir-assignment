import { Provider } from 'react-redux';
import configureStore from './redux/configSotre';
import './App.css';
import 'antd/dist/antd.css';
import Home from './Home';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
