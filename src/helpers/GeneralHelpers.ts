import axios from 'axios';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
};

export const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
};

export const isEmpty = (val: boolean | string | number | null | undefined) => {
    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

    if (val === undefined) return true;

    if (
        typeof val == 'function' ||
        typeof val == 'number' ||
        typeof val == 'boolean' ||
        Object.prototype.toString.call(val) === '[object Date]'
    )
        return false;

    if (val == null || val.length === 0)
        // null or 0 length array
        return true;

    if (typeof val == 'object') {
        Object.keys(val).length > 0 ? false : true;
    }

    return false;
};

export const hex2rgba = (hex: any, alpha = 1) => {
    const [r, g, b] = hex?.match(/\w\w/g).map((x: string) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

export const KEY_CODES = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_LEFT_IE11: 'Left',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_RIGHT_IE11: 'Right',
    ARROW_UP: 'ArrowUp',
    ARROW_UP_IE11: 'Up',
    ARROW_DOWN: 'ArrowDown',
    ARROW_DOWN_IE11: 'Down',
    ESCAPE: 'Escape',
    ESCAPE_IE11: 'Esc',
    TAB: 'Tab',
    SPACE: ' ',
    SPACE_IE11: 'Spacebar',
    ENTER: 'Enter',
};

export const scrollRevealConfig = (delay = 200, viewFactor = 0.25, reset?: boolean) => ({
    origin: 'bottom',
    distance: '10px',
    duration: 400,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false || reset,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 70, left: 0 },
});

export const addExternalLinksAttribute = () => {
    const links: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a'));
    if (links.length > 0)
        for (let i = 0; i < links.length; i++) {
            const link: HTMLAnchorElement = links[i];
            if (link.host !== window.location.host) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
        }
};

export const getClientIP = async (signal?: any) => {
    try {
        const res = await axios.get('https://api.ipify.org/?format=json', { signal });
        return res?.data;
    } catch (error: any) {
        return error?.response;
    }
};
