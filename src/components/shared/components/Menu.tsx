import React, { useState, useEffect, useRef, MutableRefObject, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { menus } from '../../../config';
import { KEY_CODES } from '../../../helpers';
import { useOnClickOutside } from '../../hooks';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { AppContext } from '../context';

const Menu: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { aboutme } = useSelector(
        (state: RootState) => ({
            aboutme: state.about.abouts,
        }),
        shallowEqual,
    );

    const [about, setAbout] = useState<DataObj>({});

    useEffect(() => {
        if (aboutme) {
            const activeAbout = aboutme.find(x => x.status);
            if (activeAbout) setAbout(activeAbout);
        }
    }, [aboutme]);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const analytics = getAnalytics();
    const { client } = useContext<DataObj>(AppContext);

    const buttonRef: MutableRefObject<any> = useRef(null);
    const navRef: MutableRefObject<any> = useRef(null);

    let menuFocusables: Array<any>;
    let firstFocusableEl: HTMLElement;
    let lastFocusableEl: HTMLElement;

    const setFocusables = () => {
        menuFocusables = [buttonRef.current, ...Array.from(navRef.current?.querySelectorAll('a'))];
        firstFocusableEl = menuFocusables[0];
        lastFocusableEl = menuFocusables[menuFocusables.length - 1];
    };

    const handleBackwardTab = (e: any) => {
        if (document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
        }
    };

    const handleForwardTab = (e: any) => {
        if (document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    };

    const onKeyDown = (e: any) => {
        switch (e.key) {
            case KEY_CODES.ESCAPE:
            case KEY_CODES.ESCAPE_IE11: {
                setMenuOpen(false);
                break;
            }

            case KEY_CODES.TAB: {
                if (menuFocusables && menuFocusables.length === 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    handleBackwardTab(e);
                } else {
                    handleForwardTab(e);
                }
                break;
            }

            default: {
                break;
            }
        }
    };

    const onResize = (e: any) => {
        if (e.currentTarget.innerWidth > 768) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);

        setFocusables();

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const wrapperRef: MutableRefObject<any> = useRef();
    useOnClickOutside(wrapperRef, () => setMenuOpen(false));

    return (
        <StyledMenu>
            <Helmet>
                <body className={menuOpen ? 'blur' : ''} />
            </Helmet>

            <div ref={wrapperRef}>
                <StyledHamburgerButton
                    onClick={toggleMenu}
                    menuOpen={menuOpen}
                    ref={buttonRef}
                    aria-label="Menu">
                    <div className="ham-box">
                        <div className="ham-box-inner" />
                    </div>
                </StyledHamburgerButton>

                <StyledSidebar
                    menuOpen={menuOpen}
                    aria-hidden={!menuOpen}
                    tabIndex={menuOpen ? 1 : -1}>
                    <nav ref={navRef}>
                        {menus && (
                            <ol>
                                {menus.map(({ href, name }, i) => (
                                    <li key={i}>
                                        <Link to={href} onClick={() => setMenuOpen(false)}>
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        )}

                        <a
                            href={about?.resume?.media}
                            className="resume-link"
                            onClick={() =>
                                logEvent(analytics, 'resume_download_mobile', {
                                    message: 'Download Button Clicked & Redirected',
                                    client,
                                })
                            }>
                            Resume
                        </a>
                    </nav>
                </StyledSidebar>
            </div>
        </StyledMenu>
    );
};

export { Menu };
export default Menu;

const StyledMenu = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;

const StyledHamburgerButton: any = styled.button`
    display: none;

    @media (max-width: 768px) {
        ${({ theme }) => theme.mixins.flexCenter};
        position: relative;
        z-index: 10;
        margin-right: -15px;
        padding: 15px;
        border: 0;
        background-color: transparent;
        color: inherit;
        text-transform: none;
        transition-timing-function: linear;
        transition-duration: 0.15s;
        transition-property: opacity, filter;
    }

    .ham-box {
        display: inline-block;
        position: relative;
        width: var(--hamburger-width);
        height: 24px;
    }

    .ham-box-inner {
        position: absolute;
        top: 50%;
        right: 0;
        width: var(--hamburger-width);
        height: 2px;
        border-radius: var(--border-radius);
        background-color: var(--tinder-pink);
        transition-duration: 0.22s;
        transition-property: transform;
        transition-delay: ${(props: any) => (props.menuOpen ? `0.12s` : `0s`)};
        transform: rotate(${(props: any) => (props.menuOpen ? `225deg` : `0deg`)});
        transition-timing-function: cubic-bezier(
            ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
        );
        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            left: auto;
            right: 0;
            width: var(--hamburger-width);
            height: 2px;
            border-radius: 4px;
            background-color: var(--tinder-pink);
            transition-timing-function: ease;
            transition-duration: 0.15s;
            transition-property: transform;
        }
        &:before {
            width: ${props => (props.menuOpen ? `100%` : `120%`)};
            top: ${props => (props.menuOpen ? `0` : `-10px`)};
            opacity: ${props => (props.menuOpen ? 0 : 1)};
            transition: ${({ menuOpen }) =>
                menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
        }
        &:after {
            width: ${props => (props.menuOpen ? `100%` : `80%`)};
            bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
            transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
            transition: ${({ menuOpen }) =>
                menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)'};
        }
    }
`;

const StyledSidebar: any = styled.aside`
    display: none;

    @media (max-width: 768px) {
        ${({ theme }) => theme.mixins.flexCenter};
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 50px 10px;
        width: min(75vw, 400px);
        height: 100vh;
        outline: 0;
        background-color: var(--light-navy);
        box-shadow: -10px 0px 30px -15px var(--navy-shadow);
        z-index: 9;
        transform: translateX(${(props: any) => (props.menuOpen ? 0 : 100)}vw);
        visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
        transition: var(--transition);
    }

    nav {
        ${({ theme }) => theme.mixins.flexBetween};
        width: 100%;
        flex-direction: column;
        color: var(--lightest-slate);
        font-family: var(--font-mono);
        text-align: center;
    }

    ol {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;

        li {
            position: relative;
            margin: 0 auto 20px;
            counter-increment: item 1;
            font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

            @media (max-width: 600px) {
                margin: 0 auto 10px;
            }

            &:before {
                content: '0' counter(item) '.';
                display: block;
                margin-bottom: 5px;
                color: var(--tinder-pink);
                font-size: var(--fz-sm);
            }
        }

        a {
            ${({ theme }) => theme.mixins.link};
            width: 100%;
            padding: 3px 20px 20px;
        }
    }

    .resume-link {
        ${({ theme }) => theme.mixins.bigButton};
        padding: 18px 50px;
        margin: 10% auto 0;
        width: max-content;
    }
`;
