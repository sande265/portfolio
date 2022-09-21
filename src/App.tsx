import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './components/routes';
import { AppProvider } from './components/shared';
import { store } from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <AppProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </AppProvider>
        </Provider>
    );
};

export default App;
