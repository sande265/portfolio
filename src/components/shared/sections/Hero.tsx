import { Fragment, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay, navDelay } from '../../../helpers';
import { usePrefersReducedMotion } from '../../hooks';

const Hero: React.FC = () => {

    const loggedUser: DataObj = {
        name: 'Sandesh Singh',
        role: 'Software Enginner',
        work: {
            organization: 'Genius Systems Pvt. Ltd.',
            website: 'https://geniussystems.com.np',
            logo: 'https://media.wimo.geniussystems.com.np/wimo/media-management/genius_250-f868487c-50d8-453e-8add-ce6a120246b3.png',
            location: 'Dhobighat, Lalitpur Nepal',
            country: 'Nepal',
        },
        description: `I'm a Software Enginner developing, maintaining & occasionally designing, wide array of digital products
        & creating immaculate apps. Currently I am building`,
    };

    const [mounted, setMounted] = useState<boolean>(false);
    const reduceMotion = usePrefersReducedMotion();

    const helloItem = <h1>Hi, my name is</h1>;

    const nameItem = <h2 className="big-heading">{loggedUser.name}.</h2>;

    const infoItem = (
        <h3 className="big-heading">I build Native & Web apps.</h3>
    );

    const currentInfo = (
        <Fragment>
            <p>
                {loggedUser.description}
                <br />
                @&nbsp;
                <a
                    href={loggedUser.work.website}
                    target="_blank"
                    rel="noreferrer"
                >
                    {loggedUser.work.organization}
                </a>
            </p>
        </Fragment>
    );

    const elements: JSX.Element[] = [
        helloItem,
        nameItem,
        infoItem,
        currentInfo,
    ];

    useEffect(() => {
        if (reduceMotion) return;
        const timeout = setTimeout(() => setMounted(true), navDelay);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <HeroSection>
            {reduceMotion ? (
                <Fragment>
                    {elements.map((item: any, i: number) => (
                        <div key={i}>{item}</div>
                    ))}
                </Fragment>
            ) : (
                <TransitionGroup component={null}>
                    {mounted &&
                        elements.map((item: any, i: number) => (
                            <CSSTransition
                                key={i}
                                classNames="fadeup"
                                timeout={loaderDelay}
                            >
                                <div
                                    style={{ transitionDelay: `${i + 1}00ms` }}
                                >
                                    {item}
                                </div>
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            )}
        </HeroSection>
    );
};

export { Hero };
export default { Hero };

const HeroSection = styled.section`
    ${({ theme }: any) => theme.mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0;

    @media (max-width: 480px) and (min-height: 700px) {
        padding-bottom: 10vh;
    }

    h1 {
        margin: 0 0 30px 4px;
        color: var(--green);
        font-family: var(--font-mono);
        font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
        font-weight: 400;

        @media (max-width: 480px) {
            margin: 0 0 20px 2px;
        }
    }

    h3 {
        margin-top: 10px;
        color: var(--slate);
        line-height: 0.9;
    }

    p {
        margin: 20px 0 0;
        max-width: 540px;
    }

    .email-link {
        ${({ theme }: any) => theme.mixins.bigButton};
        margin-top: 50px;
    }
`;
