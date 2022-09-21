// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorPage = () => {
    // const { state } = useLocation();

    // const status = state ? state?.status?.toString() : null;

    return (
        <Container className="fillHeight">
            <Section>
                <h1>404</h1>
                <h3>You seem to be lost!</h3>
                <span>The page you are looking for does not exists.</span>
                <Button onClick={() => window.location = "/"}>Home</Button>
                <Button onClick={() => window.history.back()}>Back</Button>
            </Section>
        </Container>
    );
};

const Container = styled.main`
    counter-reset: section;
`;

const Section = styled.div`
    ${({ theme }) => theme.mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    min-height: calc(100vh - 5rem);
    padding: 0;
`;

const Button = styled.button`
    overflow: hidden;
    background: transparent;
    position: relative;
    padding: 8px 50px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1em;
    letter-spacing: 2px;
    transition: 0.2s ease;
    font-weight: bold;
    margin: 5px 0px;
    border: 4px solid var(--green);
    color: white;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 0%;
        height: 100%;
        border-radius: 30px;
        background: var(--green);
        z-index: -1;
        transition: 0.2s ease;
    }

    &:hover {
        background-color: var(--green);
        color: var(--white);
        transition: 0.2s ease;
    }

    &:hover:before {
        width: 100%;
    }
`;
