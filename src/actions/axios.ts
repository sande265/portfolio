import axios from 'axios';
import { decodeJWT, isEmpty } from '../helpers';
import { handleLogout } from '../helpers';
import { Config } from '../config';

export const api = axios.create({
    baseURL: Config.baseUrl,
});

const baseURL: string | undefined = Config.baseUrl;

let refreshing = false;
let refreshSubscribers: Array<any> = [];

api.interceptors.request.use(
    function (config) {
        const token: string | null = localStorage.getItem('auth');
        if (token && config.headers) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const { config } = error;
        const originalRequest = config;
        if (parseInt(error.response?.status) === 401) {
            if (!refreshing) {
                refreshing = true;
                const config: any = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                axios
                    .post(
                        baseURL + '/auth/v1/refresh',
                        { refresh_token: localStorage.getItem('rt') },
                        config,
                    )
                    .then(
                        res => {
                            if (res.status === 200) {
                                refreshing = false;
                                onRrefreshed(res.data.access_token);
                                setAuthToken(res.data.access_token, res.data.refresh_token);
                                refreshSubscribers = [];
                            }
                            if (res.status === 401) {
                                handleLogout();
                                refreshing = false;
                                // store.dispatch(
                                //     errorAlert('You have been logged out, invalid token'),
                                // );
                            }
                        },
                        err => {
                            const {
                                response: { status },
                            } = err;
                            if (status === 401 || status === 422) {
                                handleLogout();
                                // store.dispatch(
                                //     errorAlert('You have been logged out, invalid token'),
                                // );
                            }
                        },
                    );
            }
            const retryOrigReq = new Promise(resolve => {
                subscribeTokenRefresh((token: string | null) => {
                    // replace the expired token and retry
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    resolve(axios(originalRequest));
                });
            });
            return retryOrigReq;
        }
        return Promise.reject(error.response);
    },
);

function onRrefreshed(token: string | null) {
    refreshSubscribers.map(cb => cb(token));
}

function subscribeTokenRefresh(cb: any) {
    refreshSubscribers.push(cb);
}

export const isTokenExpired = () => {
    const token: string | any = localStorage.getItem('auth');
    if (!isEmpty(token) && decodeJWT(token).exp < Date.now() / 1000) {
        return true;
    }
    return false;
};

export const setAuthToken = (token: string, rt: string) => {
    if (token) {
        // Apply authorization token to every request if logged in
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('auth', token);
        localStorage.setItem('rt', rt);
    } else {
        // Delete auth header
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('auth');
        localStorage.removeItem('rt');
    }
};
