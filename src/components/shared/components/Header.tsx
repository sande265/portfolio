import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { menus } from '../../../config';
import { loaderDelay } from '../../../helpers';
import { useScrollDirection, usePrefersReducedMotion } from '../../hooks';
import { Menu } from '.';
import { IconLogo } from '../icons';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { AppContext } from '../context';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

interface HeaderProps {
    isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome }) => {
    const { aboutme } = useSelector(
        (state: RootState) => ({
            aboutme: state.about.abouts,
        }),
        shallowEqual,
    );

    const [about, setAbout] = useState<DataObj>({});

    const [isMounted, setIsMounted] = useState(!isHome);
    const scrollDirection: any = useScrollDirection({
        initialDirection: 'down',
    });
    const [scrolledToTop, setScrolledToTop] = useState(true);
    const prefersReducedMotion: any = usePrefersReducedMotion();
    const analytics = getAnalytics();
    const { client } = useContext<DataObj>(AppContext);

    const handleScroll = () => {
        setScrolledToTop(window.pageYOffset < 50);
    };

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (aboutme) {
            const activeAbout = aboutme.find(x => x.status);
            if (activeAbout) setAbout(activeAbout);
        }
    }, [aboutme]);

    const timeout = isHome ? loaderDelay : 0;
    const fadeClass = isHome ? 'fade' : '';
    const fadeDownClass = isHome ? 'fadedown' : '';

    const Logo = (
        <div className="logo" tabIndex={-1}>
            {isHome ? (
                <a href="/" aria-label="home">
                    <IconLogo />
                </a>
            ) : (
                <Link to="/" aria-label="home">
                    <IconLogo />
                </Link>
            )}
        </div>
    );

    const ResumeLink = (
        <a
            className="resume-button"
            href={about?.resume?.media}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
                logEvent(analytics, 'resume_download', {
                    message: 'Download Button Clicked & Redirected',
                    client,
                })
            }>
            Resume
        </a>
    );

    return (
        <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
            <StyledNav>
                {prefersReducedMotion ? (
                    <>
                        {Logo}

                        <StyledLinks>
                            <ol>
                                {menus &&
                                    menus.map(({ href, name }, i: number) => (
                                        <li key={i}>
                                            <Link to={href}>{name}</Link>
                                        </li>
                                    ))}
                            </ol>
                            <div>{ResumeLink}</div>
                        </StyledLinks>

                        <Menu />
                    </>
                ) : (
                    <>
                        <TransitionGroup component={null}>
                            {isMounted && (
                                <CSSTransition classNames={fadeClass} timeout={timeout}>
                                    <>{Logo}</>
                                </CSSTransition>
                            )}
                        </TransitionGroup>

                        <StyledLinks>
                            <ol>
                                <TransitionGroup component={null}>
                                    {isMounted &&
                                        menus &&
                                        menus.map(({ href, name }, i: number) => (
                                            <CSSTransition
                                                key={i}
                                                classNames={fadeDownClass}
                                                timeout={timeout}>
                                                <li
                                                    key={i}
                                                    style={{
                                                        transitionDelay: `${
                                                            isHome ? i * 100 : 0
                                                        }ms`,
                                                    }}>
                                                    <Link to={href}>{name}</Link>
                                                </li>
                                            </CSSTransition>
                                        ))}
                                </TransitionGroup>
                            </ol>

                            <TransitionGroup component={null}>
                                {isMounted && (
                                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                                        <div
                                            style={{
                                                transitionDelay: `${
                                                    isHome ? menus.length * 100 : 0
                                                }ms`,
                                            }}>
                                            {ResumeLink}
                                        </div>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </StyledLinks>

                        <TransitionGroup component={null}>
                            {isMounted && (
                                <CSSTransition classNames={fadeClass} timeout={timeout}>
                                    <Menu />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </>
                )}
            </StyledNav>
        </StyledHeader>
    );
};

Header.propTypes = {
    isHome: PropTypes.bool,
};

export { Header };
export default Header;

const StyledHeader: any = styled.header`
    ${({ theme }) => theme.mixins.flexBetween};
    position: fixed;
    top: 0;
    z-index: 11;
    padding: 0px 50px;
    width: 100%;
    height: var(--nav-height);
    background-color: #000;
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
    backdrop-filter: blur(10px);
    transition: var(--transition);

    @media (max-width: 1080px) {
        padding: 0 40px;
    }
    @media (max-width: 768px) {
        padding: 0 25px;
    }

    @media (prefers-reduced-motion: no-preference) {
        ${(props: any) =>
            props.scrollDirection === 'up' &&
            !props.scrolledToTop &&
            css`
                height: var(--nav-scroll-height);
                transform: translateY(0px);
                background-color: #100f0f;
                box-shadow: 0 10px 30px -10px var(--navy-shadow);
            `};

        ${(props: any) =>
            props.scrollDirection === 'down' &&
            !props.scrolledToTop &&
            css`
                height: var(--nav-scroll-height);
                transform: translateY(calc(var(--nav-scroll-height) * -1));
                box-shadow: 0 10px 30px -10px var(--navy-shadow);
            `};
    }
`;

const StyledNav = styled.nav`
    ${({ theme }) => theme.mixins.flexBetween};
    position: relative;
    width: 100%;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    counter-reset: item 0;
    z-index: 12;

    .logo {
        ${({ theme }) => theme.mixins.flexCenter};

        a {
            color: var(--tinder-pink);
            width: 200px;
            height: 60px;

            &:hover,
            &:focus {
                svg {
                    fill: var(--tinder-pink-tint);
                }
            }

            svg {
                fill: none;
                transition: var(--transition);
                user-select: none;
            }
        }
    }
`;

const StyledLinks = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }

    ol {
        ${({ theme }) => theme.mixins.flexBetween};
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            margin: 0 5px;
            position: relative;
            counter-increment: item 1;
            font-size: var(--fz-xs);

            a {
                padding: 10px;

                &:before {
                    content: '0' counter(item) '.';
                    margin-right: 5px;
                    color: var(--tinder-pink);
                    font-size: var(--fz-xxs);
                    text-align: right;
                }
            }
        }
    }

    .resume-button {
        ${({ theme }) => theme.mixins.smallButton};
        margin-left: 15px;
        font-size: var(--fz-xs);
    }
`;
