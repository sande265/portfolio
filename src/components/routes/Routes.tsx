import { logEvent, getAnalytics } from 'firebase/analytics';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorPage, Home, Projects } from '../pages';
import { AppContext } from '../shared';

const AppRoutes = () => {
    const analytics = getAnalytics();
    const { client } = useContext<DataObj>(AppContext);

    logEvent(analytics, 'page_view', { client });

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/projects" element={<Projects />} />
        </Routes>
    );
};

export default AppRoutes;
