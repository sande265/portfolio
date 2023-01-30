import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { loaderDelay, navDelay } from '../../../helpers';
import { usePrefersReducedMotion } from '../../hooks';
import { RootState } from '../../../redux/store';
import { getExperiences } from '../../../actions/experience-actions';

const Hero: React.FC = () => {

    const { experiences } = useSelector(
        (state: RootState) => ({
            experiences: state.experience.experiences,
        }),
        shallowEqual,
    );
    const dispatch = useDispatch();

    const [experience, setExperience] = useState<DataObj>({
        description: '',
        organization: {},
    });
    const [mounted, setMounted] = useState<boolean>(false);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getExperiences({}, controller));
        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (experiences?.length > 0) {
            const experience = experiences.find((x: DataObj) => x.to === null);
            if (experience) setExperience(experience);
        }
    }, [experiences]);

    const helloItem = <h1>Hi, my name is</h1>;

    const nameItem = <h2 className="big-heading">Sandesh Singh.</h2>;

    const infoItem = <h3 className="big-heading">I build Native & Web apps.</h3>;

    const currentInfo = (
        <Fragment>
            <p>
                {experience?.description}
                <br />
                @&nbsp;
                <a href={experience?.organization?.website} target="_blank" rel="noreferrer">
                    {experience?.organization?.organization}
                </a>
            </p>
        </Fragment>
    );

    const elements: JSX.Element[] = [helloItem, nameItem, infoItem, currentInfo];

    useEffect(() => {
        if (reduceMotion) return;
        const timeout = setTimeout(() => setMounted(true), navDelay);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <HeroSection id='hero'>
            {reduceMotion ? (
                <Fragment>
                    {elements.map((item, i: number) => (
                        <div key={i}>{item}</div>
                    ))}
                </Fragment>
            ) : (
                <TransitionGroup component={null}>
                    {mounted &&
                        elements.map((item: any, i: number) => (
                            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
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
        color: var(--tinder-pink);
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
