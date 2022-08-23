import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Aside } from '.';

interface EmailProps {
    isHome?: boolean | undefined;
}

const Email: React.FC<EmailProps> = ({ isHome }) => {
    const email = 'sandeshsingh265@gmail.com';
    return (
        <Aside isHome={isHome} orientation="right">
            <EmailLink>
                <a href={`mailto:${email}`}>{email}</a>
            </EmailLink>
        </Aside>
    );
};

Email.propTypes = {
    isHome: PropTypes.bool,
};

export { Email };
export default Email;

const EmailLink = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 90px;
        margin: 0 auto;
        background-color: var(--light-slate);
    }

    a {
        margin: 20px auto;
        padding: 10px;
        font-family: var(--font-mono);
        font-size: var(--fz-xxs);
        line-height: var(--fz-lg);
        letter-spacing: 0.1em;
        writing-mode: vertical-rl;

        &:hover,
        &:focus {
            transform: translateY(-3px);
        }
    }
`;
