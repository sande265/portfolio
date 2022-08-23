import { ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { addExternalLinksAttribute } from '../../../helpers';
import styled, { ThemeProvider } from 'styled-components';
import {
    BaseTheme,
    Email,
    Footer,
    GlobalStyles,
    Header,
    Social,
    Loader,
} from '../../shared';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (loading) return;
        if (location.hash) {
            const id = location.hash.substring(1); // location.hash without the '#'
            timeout = setTimeout(() => {
                const el: HTMLElement | null = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 0);
        }

        addExternalLinksAttribute();

        return () => clearTimeout(timeout);
    }, [loading]);

    return (
        <ThemeProvider theme={BaseTheme}>
            <GlobalStyles />
            <a className="skip-to-content" href="#content">
                Skip to Content
            </a>
            {loading && isHome ? (
                <Loader onLoaded={() => setLoading(false)} />
            ) : (
                <StyledContent>
                    <Header isHome={isHome} />
                    <Social isHome={isHome} />
                    <Email isHome={isHome} />

                    <div id="content">
                        {children}
                        <Footer />
                    </div>
                </StyledContent>
            )}
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
