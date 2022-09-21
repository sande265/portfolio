import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { Icon } from '../components';
import { usePrefersReducedMotion } from '../../hooks';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getProjects } from '../../../actions/project-actions';

const Projects: React.FC = () => {
    const { projects } = useSelector(
        (state: RootState) => ({
            projects: state.project.projects,
        }),
        shallowEqual,
    );
    const dispatch = useDispatch();

    const [showMore, setShowMore] = useState(false);
    const revealTitle: MutableRefObject<any> = useRef(null);
    const revealArchiveLink: MutableRefObject<any> = useRef(null);
    const revealProjects: MutableRefObject<any> = useRef([]);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        scrollReveal.reveal(revealTitle.current, scrollRevealConfig());
        scrollReveal.reveal(revealArchiveLink.current, scrollRevealConfig());
        revealProjects.current.forEach((ref: any, i: number) =>
            scrollReveal.reveal(ref, scrollRevealConfig(i * 100, 0.35, false)),
        );
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(getProjects({ limit: 100, filter: [{ key: 'status', value: true }], sort_field: "order" }, controller));
        return () => {
            controller.abort();
        };
    }, []);

    const GRID_LIMIT = 6;
    const firstSix = projects.slice(0, GRID_LIMIT);
    const projectsToShow = showMore ? projects : firstSix;

    const projectInner = (node: DataObj) => {
        const { github, external, title, tech, html } = node;

        return (
            <div className="project-inner">
                <header>
                    <div className="project-top">
                        <div className="folder">
                            <Icon name="Folder" />
                        </div>
                        <div className="project-links">
                            {github && (
                                <a
                                    href={github}
                                    aria-label="GitHub Link"
                                    target="_blank"
                                    rel="noreferrer">
                                    <Icon name="GitHub" />
                                </a>
                            )}
                            {external && (
                                <a
                                    href={external}
                                    aria-label="External Link"
                                    className="external"
                                    target="_blank"
                                    rel="noreferrer">
                                    <Icon name="External" />
                                </a>
                            )}
                        </div>
                    </div>

                    <h3 className="project-title">
                        <a href={external} target="_blank" rel="noreferrer">
                            {title}
                        </a>
                    </h3>

                    <div
                        className="project-description"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </header>

                <footer>
                    {tech && (
                        <ul className="project-tech-list">
                            {tech.map((tech: string[], i: number) => (
                                <li key={i}>{tech}</li>
                            ))}
                        </ul>
                    )}
                </footer>
            </div>
        );
    };

    return (
        <Section>
            <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

            {/* <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
                view the archive
            </Link> */}

            <ul className="projects-grid">
                {prefersReducedMotion ? (
                    <>
                        {projectsToShow &&
                            projectsToShow.map((node, i) => (
                                <Project key={i}>{projectInner(node)}</Project>
                            ))}
                    </>
                ) : (
                    <TransitionGroup component={null}>
                        {projectsToShow &&
                            projectsToShow.map((node, i) => (
                                <CSSTransition
                                    key={i}
                                    classNames="fadeup"
                                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                                    exit={false}>
                                    <Project
                                        key={i}
                                        ref={el => (revealProjects.current[i] = el)}
                                        style={{
                                            transitionDelay: `${
                                                i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
                                            }ms`,
                                        }}>
                                        {projectInner(node)}
                                    </Project>
                                </CSSTransition>
                            ))}
                    </TransitionGroup>
                )}
            </ul>

            <button className="more-button" onClick={() => setShowMore(!showMore)}>
                Show {showMore ? 'Less' : 'More'}
            </button>
        </Section>
    );
};

export { Projects };
export default Projects;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: clamp(24px, 5vw, var(--fz-heading));
    }

    .archive-link {
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        &:after {
            bottom: 0.1em;
        }
    }

    .projects-grid {
        ${({ theme }) => theme.mixins.resetList};
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 15px;
        position: relative;
        margin-top: 50px;

        @media (max-width: 1080px) {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }

    .more-button {
        ${({ theme }) => theme.mixins.button};
        margin: 80px auto 0;
    }
`;

const Project = styled.li`
    position: relative;
    cursor: default;
    transition: var(--transition);

    @media (prefers-reduced-motion: no-preference) {
        &:hover,
        &:focus-within {
            .project-inner {
                transform: translateY(-7px);
            }
        }
    }

    a {
        position: relative;
        z-index: 1;
    }

    .project-inner {
        ${({ theme }) => theme.mixins.boxShadow};
        ${({ theme }) => theme.mixins.flexBetween};
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        height: 100%;
        padding: 2rem 1.75rem;
        border-radius: var(--border-radius);
        background-color: var(--light-navy);
        transition: var(--transition);
        overflow: auto;
    }

    .project-top {
        ${({ theme }) => theme.mixins.flexBetween};
        margin-bottom: 35px;

        .folder {
            color: var(--green);
            svg {
                width: 40px;
                height: 40px;
            }
        }

        .project-links {
            display: flex;
            align-items: center;
            margin-right: -10px;
            color: var(--light-slate);

            a {
                ${({ theme }) => theme.mixins.flexCenter};
                padding: 5px 7px;

                &.external {
                    svg {
                        width: 22px;
                        height: 22px;
                        margin-top: -4px;
                    }
                }

                svg {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    .project-title {
        margin: 0 0 10px;
        color: var(--lightest-slate);
        font-size: var(--fz-xxl);

        a {
            position: static;

            &:before {
                content: '';
                display: block;
                position: absolute;
                z-index: 0;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
        }
    }

    .project-description {
        color: var(--light-slate);
        font-size: 17px;

        a {
            ${({ theme }) => theme.mixins.inlineLink};
        }
    }

    .project-tech-list {
        display: flex;
        align-items: flex-end;
        flex-grow: 1;
        flex-wrap: wrap;
        padding: 0;
        margin: 20px 0 0 0;
        list-style: none;

        li {
            font-family: var(--font-mono);
            font-size: var(--fz-xxs);
            line-height: 1.75;

            &:not(:last-of-type) {
                margin-right: 15px;
            }
        }
    }
`;
