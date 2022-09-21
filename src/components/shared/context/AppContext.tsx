import { createContext, useEffect, useState } from 'react';
import { getClientIP } from '../../../helpers';
import PropTypes from 'prop-types';

export const AppContext = createContext<DataObj>({});

export const AppProvider = ({ ...props }) => {
    const [clientIP, setClientIP] = useState<string>('');

    useEffect(() => {
        const controller = new AbortController();
        getClientIP(controller.signal).then(res => {
            if (res) setClientIP(res?.ip);
        });
        return () => {
            controller.abort()
        }
    }, []);

    const defaultValue = {
        client: clientIP,
    };

    return <AppContext.Provider value={defaultValue}>{props.children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node,
};
