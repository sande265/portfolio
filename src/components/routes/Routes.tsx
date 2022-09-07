import { getAnalytics, logEvent } from 'firebase/analytics';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getClientIP } from '../../helpers';
import { Home } from '../pages';
import Layout from './Layout';

const AppRoutes = () => {

    const analytics = getAnalytics();
    const [clientIP, setClientIP] = useState<string>("");

    useEffect(() => {
        getClientIP((err: any, ip: string) => {
            if (err) console.log("Error: ", err);
            else {
                setClientIP(ip);
            }
        })
    }, [])

    logEvent(analytics, "page_view", { "origin": clientIP })

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Layout>
    );
};

export default AppRoutes;
