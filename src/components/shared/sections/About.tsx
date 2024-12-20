import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAboutMeList } from '../../../actions/about-actions';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { RootState } from '../../../redux/store';
import { usePrefersReducedMotion } from '../../hooks';

const About: React.FC = () => {
    const { aboutme } = useSelector(
        (state: RootState) => ({
            aboutme: state.about.abouts,
        }),
        shallowEqual,
    );

    const [about, setAbout] = useState<DataObj>({});
    const showContainer: MutableRefObject<any> = useRef(null);
    const reduceMotion = usePrefersReducedMotion();
    const dispatch = useDispatch();

    useEffect(() => {
        if (reduceMotion) return;

        scrollReveal.reveal(showContainer.current, scrollRevealConfig());
    }, []);

    useEffect(() => {
        if (aboutme) {
            const activeAbout = aboutme?.find(x => x.status === 1);
            if (activeAbout) setAbout(activeAbout)
        }
    }, [aboutme])

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getAboutMeList({}, controller));
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <AboutSection id="about" ref={showContainer}>
            <h2 className="numbered-heading">What I Do</h2>
            <div className="inner">
                <Text>
                    <div>
                        <p>
                            {about?.description}
                        </p>
                        <p>
                            Today, I’ve had the privilege of working with{' '}
                            {about?.organization?.map((org: DataObj, idx: number) => (
                                <Fragment key={idx}>
                                    <a href={org.website}>
                                        {org.description}
                                        {idx !== org.length - 1 && ','}&nbsp;
                                    </a>
                                </Fragment>
                            ))}
                        </p>
                        <p className='tech-info'>Technologies I am friendly with:</p>
                    </div>
                    <ul className="skills-list">
                        {about?.tech_stack?.map((lib: string, idx: number) => (
                            <li key={idx}>{lib}</li>
                        ))}
                    </ul>
                </Text>
                <Pic>
                    <div className="wrapper">
                        <img src={about?.attachment?.media} style={{ width: "100%" }} alt="" className="img" />
                    </div>
                </Pic>
            </div>
        </AboutSection>
    );
};

export { About };
export default About;

const AboutSection = styled.section`
    max-width: 900px;

    .inner {
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-gap: 50px;

        @media (max-width: 768px) {
            display: block;
        }
    }

    p {
        color: var(--light-slate);
    }

    .tech-info {
        font-size: var(--fz-xl);
        font-weight: 500;
    }
`;
const Text = styled.div`
    ul.skills-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(140px, 200px));
        grid-gap: 0 10px;
        padding: 0;
        margin: 20px 0 0 0;
        overflow: hidden;
        list-style: none;

        li {
            position: relative;
            margin-bottom: 12px;
            padding-left: 20px;
            font-family: var(--font-mono);
            font-size: var(--fz-xs);
            color: var(--lightest-slate);

            &:before {
                content: '▹';
                position: absolute;
                left: 0;
                color: var(--cyberpunk);
                font-size: var(--fz-xl);
                line-height: 12px;
            }
        }
    }
`;
const Pic = styled.div`
    position: relative;
    max-width: 300px;

    @media (max-width: 768px) {
        margin: 50px auto 0;
        width: 70%;
    }

    .wrapper {
        ${({ theme }) => theme.mixins.boxShadow};
        display: block;
        position: relative;
        width: 100%;
        border-radius: var(--border-radius);
        background-color: var(--cyberpunk);

        &:hover,
        &:focus {
            outline: 0;

            &:after {
                top: 15px;
                left: 15px;
            }

            .img {
                filter: none;
                mix-blend-mode: normal;
            }
        }

        .img {
            position: relative;
            border-radius: var(--border-radius);
            // mix-blend-mode: multiply;
            filter: contrast(1);
            transition: var(--transition);
        }

        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: var(--border-radius);
            transition: var(--transition);
        }

        &:before {
            top: 0;
            left: 0;
            background-color: transparent;
            // background-color: var(--navy);
            // mix-blend-mode: normal;
        }

        &:after {
            border: 2px solid var(--cyberpunk);
            top: 20px;
            left: 20px;
            z-index: -1;
        }
    }
`;
