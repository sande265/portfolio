import { MutableRefObject, useEffect, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { RootState } from '../../../redux/store';
import { usePrefersReducedMotion } from '../../hooks';
import { Icon } from '../components';
import styled from 'styled-components';
import { getFeaturedProjects } from '../../../actions/featured-actions';

interface FeaturedAttachment {
    name: string;
    media: string;
    width: number | string | undefined;
    height: number | string | undefined;
}

interface FeaturedData {
    external: string | undefined;
    title: string | undefined;
    tech: Array<string> | undefined;
    attachments: FeaturedAttachment;
    cta: any;
    github: string | undefined;
    project: string;
}

const Featured: React.FC = () => {
    const { featured_projects }: any = useSelector(
        (state: RootState) => ({
            featured_projects: state.featured.featured_projects,
        }),
        shallowEqual,
    );

    const showContainer: MutableRefObject<any> = useRef(null);
    const reduceMotion: boolean = usePrefersReducedMotion();
    const dispatch = useDispatch();

    useEffect(() => {
        if (reduceMotion) return;

        scrollReveal.reveal(showContainer.current, scrollRevealConfig());
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        if (featured_projects?.length <= 0) dispatch(getFeaturedProjects({}, controller));
        return () => {
            controller.abort();
        };
    }, [featured_projects]);

    return (
        <section id="projects">
            <h2 className="numbered-heading" ref={showContainer}>
                Some Things I’ve Built
            </h2>
            <ProjectsGrid>
                {featured_projects?.map((feature: DataObj | FeaturedData, idx: number) => {
                    const {
                        title,
                        attachments,
                        cta,
                        project: { html, external, github, tech },
                    } = feature;
                    return (
                        <Project
                            key={idx}
                            ref={el =>
                                showContainer.current ? (showContainer.current[idx] = el) : () => ''
                            }>
                            <div className="project-content">
                                <p className="project-overline">Featured</p>
                                <h3 className="project-title">
                                    <a href={external}>{title}</a>
                                </h3>

                                <div
                                    className="project-description"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                                {tech?.length && (
                                    <ul className="project-tech-list">
                                        {tech.map((tech: string, i: number) => (
                                            <li key={i}>{tech}</li>
                                        ))}
                                    </ul>
                                )}

                                <div className="project-links">
                                    {cta && (
                                        <a href={cta} aria-label="Course Link" className="cta">
                                            Learn More
                                        </a>
                                    )}
                                    {github && (
                                        <a href={github} aria-label="GitHub Link">
                                            <Icon name="GitHub" />
                                        </a>
                                    )}
                                    {external && !cta && (
                                        <a
                                            href={external}
                                            aria-label="External Link"
                                            className="external">
                                            <Icon name="External" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="project-image">
                                {attachments?.map((item: FeaturedAttachment, idx: number) => {
                                    let mediaUrl = item?.media;
                                    if (item?.height) mediaUrl += `?h=${item.height}`;
                                    if (item?.width) mediaUrl += `${mediaUrl.includes("?") ? "&" : "?"}w=${item.width}`;
                                    return (
                                        <a
                                            key={idx}
                                            className="image-wrapper"
                                            target={'_blank'}
                                            rel="noreferrer"
                                            href={external ? external : github ? github : '#'}>
                                            <img
                                                src={mediaUrl}
                                                alt={title}
                                                style={{ width: '100%', objectFit: "contain", borderRadius: "var(--border-radius)" }}
                                                // height={438}
                                                // width={700}
                                                className="img"
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </Project>
                    );
                })}
            </ProjectsGrid>
        </section>
    );
};

export { Featured };
export default Featured;

const ProjectsGrid = styled.ul`
    ${({ theme }) => theme.mixins.resetList};

    a {
        position: relative;
        z-index: 1;
    }
`;

const Project = styled.li`
    position: relative;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;

    @media (max-width: 768px) {
        ${({ theme }) => theme.mixins.boxShadow};
    }

    &:not(:last-of-type) {
        margin-bottom: 100px;

        @media (max-width: 768px) {
            margin-bottom: 70px;
        }

        @media (max-width: 480px) {
            margin-bottom: 30px;
        }
    }

    &:nth-of-type(odd) {
        .project-content {
            grid-column: 7 / -1;
            text-align: right;

            @media (max-width: 1080px) {
                grid-column: 5 / -1;
            }
            @media (max-width: 768px) {
                grid-column: 1 / -1;
                padding: 40px 40px 30px;
                text-align: left;
            }
            @media (max-width: 480px) {
                padding: 25px 25px 20px;
            }
        }
        .project-tech-list {
            justify-content: flex-end;

            @media (max-width: 768px) {
                justify-content: flex-start;
            }

            li {
                margin: 0 0 5px 20px;

                @media (max-width: 768px) {
                    margin: 0 10px 5px 0;
                }
            }
        }
        .project-links {
            justify-content: flex-end;
            margin-left: 0;
            margin-right: -10px;

            @media (max-width: 768px) {
                justify-content: flex-start;
                margin-left: -10px;
                margin-right: 0;
            }
        }
        .project-image {
            grid-column: 1 / 8;

            @media (max-width: 768px) {
                grid-column: 1 / -1;
            }
        }
    }

    .project-content {
        position: relative;
        grid-column: 1 / 7;
        grid-row: 1 / -1;

        @media (max-width: 1080px) {
            grid-column: 1 / 9;
        }

        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            grid-column: 1 / -1;
            padding: 40px 40px 30px;
            z-index: 5;
        }

        @media (max-width: 480px) {
            padding: 30px 25px 20px;
        }
    }

    .project-overline {
        margin: 10px 0;
        color: var(--tinder-pink);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        font-weight: 400;
    }

    .project-title {
        color: var(--lightest-slate);
        font-size: clamp(24px, 5vw, 28px);

        @media (min-width: 768px) {
            margin: 0 0 20px;
        }

        @media (max-width: 768px) {
            color: var(--white);

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
    }

    .project-description {
        ${({ theme }) => theme.mixins.boxShadow};
        position: relative;
        z-index: 2;
        padding: 25px;
        border-radius: var(--border-radius);
        background-color: var(--light-navy);
        color: var(--light-slate);
        opacity: 0.9;
        font-size: var(--fz-lg);

        :hover {
            opacity: 1;
        }

        @media (max-width: 768px) {
            padding: 20px 0;
            background-color: transparent;
            box-shadow: none;

            &:hover {
                box-shadow: none;
            }
        }

        a {
            ${({ theme }) => theme.mixins.inlineLink};
        }

        strong {
            color: var(--white);
            font-weight: normal;
        }
    }

    .project-tech-list {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        z-index: 2;
        margin: 25px 0 10px;
        padding: 0;
        list-style: none;

        li {
            margin: 0 20px 5px 0;
            color: var(--light-slate);
            font-family: var(--font-mono);
            font-size: var(--fz-xs);
            white-space: nowrap;
        }

        @media (max-width: 768px) {
            margin: 10px 0;

            li {
                margin: 0 10px 5px 0;
                color: var(--lightest-slate);
            }
        }
    }

    .project-links {
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 10px;
        margin-left: -10px;
        color: var(--lightest-slate);

        a {
            ${({ theme }) => theme.mixins.flexCenter};
            padding: 10px;

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

        .cta {
            ${({ theme }) => theme.mixins.smallButton};
            margin: 10px;
        }
    }

    .image-wrapper {
        display: inline-flex;
        justify-content: center;
    }

    .project-image {
        ${({ theme }) => theme.mixins.boxShadow};
        grid-column: 6 / -1;
        grid-row: 1 / -1;
        position: relative;
        z-index: 1;

        @media (max-width: 768px) {
            grid-column: 1 / -1;
            height: 100%;
            opacity: 1;
        }

        a {
            width: 100%;
            height: 100%;
            //   background-color: var(--tinder-pink);
            border-radius: var(--border-radius);
            vertical-align: middle;

            &:hover,
            &:focus {
                background: transparent;
                outline: 0;

                &:before,
                .img {
                    background: transparent;
                    filter: none;
                }
            }

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 3;
                transition: var(--transition);
            }
        }

        .img {
            border-radius: var(--border-radius);
            mix-blend-mode: multiply;
            filter: contrast(1) brightness(80%);

            @media (max-width: 768px) {
                object-fit: cover;
                width: auto;
                height: 100%;
                filter: contrast(1) brightness(25%);
            }
        }
    }
`;
