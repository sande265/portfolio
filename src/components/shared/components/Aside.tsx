import React, { useState, useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay } from '../../../helpers';
import { usePrefersReducedMotion } from '../../hooks';

interface AsideProps {
    children: ReactNode;
    isHome?: boolean | undefined;
    orientation?: string | undefined;
}

const Aside: React.FC<AsideProps> = ({ children, isHome, orientation }) => {
    const [isMounted, setIsMounted] = useState(!isHome);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (!isHome || prefersReducedMotion) {
            return;
        }
        const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <StyledSideElement orientation={orientation}>
            {prefersReducedMotion ? (
                <>{children}</>
            ) : (
                <TransitionGroup component={null}>
                    {isMounted && (
                        <CSSTransition
                            classNames={isHome ? 'fade' : ''}
                            timeout={isHome ? loaderDelay : 0}
                        >
                            {children}
                        </CSSTransition>
                    )}
                </TransitionGroup>
            )}
        </StyledSideElement>
    );
};

Aside.propTypes = {
    children: PropTypes.node.isRequired,
    isHome: PropTypes.bool,
    orientation: PropTypes.string,
};

export { Aside };
export default Aside;

const StyledSideElement: any = styled.div`
    width: 40px;
    position: fixed;
    bottom: 0;
    left: ${(props: any) => (props.orientation === 'left' ? '40px' : 'auto')};
    right: ${(props: any) => (props.orientation === 'left' ? 'auto' : '40px')};
    z-index: 10;
    color: var(--light-slate);

    @media (max-width: 1080px) {
        left: ${(props: any) =>
            props.orientation === 'left' ? '20px' : 'auto'};
        right: ${(props: any) =>
            props.orientation === 'left' ? 'auto' : '20px'};
    }

    @media (max-width: 768px) {
        display: none;
    }
`;
