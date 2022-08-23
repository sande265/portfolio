import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import Layout from './Layout';

const AppRoutes = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Layout>
    );
};

export default AppRoutes;
