import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from './Icons';
import { links } from '../../../config';

const Footer: React.FC = () => {

    const [githubInfo, setGitHubInfo] = useState<DataObj>({
        stars: null,
        forks: null,
    });

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            return;
        }
        fetch('https://api.github.com/repos/sande265/portfolio')
            .then((response) => response.json())
            .then((json) => {
                const { stargazers_count, forks_count } = json;
                setGitHubInfo({
                    stars: stargazers_count,
                    forks: forks_count,
                });
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <StyledFooter>
            <StyledSocialLinks>
                <ul>
                    {links?.map(({ name, link }, i: number) => (
                        <li key={i}>
                            <a href={link} aria-label={name}>
                                <Icon name={name} />
                            </a>
                        </li>
                    ))}
                </ul>
            </StyledSocialLinks>

            <StyledCredit tabIndex={-1}>
                <a href="https://github.com/sande265" className="href">
                    <div className="">Built by <span style={{ color: "var(--green)" }}>Sandesh Singh</span></div>
                </a>
                <div>
                    <div>Design Inspiration from <span style={{ color: "var(--green)" }}>Brittany Chiang</span></div>
                    {githubInfo.stars && githubInfo.forks && (
                        <div className="github-stats">
                            <span>
                                <Icon name="Star" />
                                <span>
                                    {githubInfo?.stars?.toLocaleString()}
                                </span>
                            </span>
                            <span>
                                <Icon name="Fork" />
                                <span>
                                    {githubInfo?.forks?.toLocaleString()}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </StyledCredit>
        </StyledFooter>
    );
};

Footer.propTypes = {
    githubInfo: PropTypes.object,
};

export { Footer };
export default Footer;

const StyledFooter = styled.footer`
    ${({ theme }) => theme.mixins.flexCenter};
    flex-direction: column;
    height: auto;
    min-height: 70px;
    padding: 15px;
    text-align: center;
`;

const StyledSocialLinks = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        width: 100%;
        max-width: 270px;
        margin: 0 auto 10px;
        color: var(--light-slate);
    }

    ul {
        ${({ theme }) => theme.mixins.flexBetween};
        padding: 0;
        margin: 0;
        list-style: none;

        a {
            padding: 10px;
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
`;

const StyledCredit = styled.div`

    display: flex;
    flex-direction: column;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1;

    a {
        padding: 10px;
    }

    .github-stats {
        margin-top: 10px;

        & > span {
            display: inline-flex;
            align-items: center;
            margin: 0 7px;
        }
        svg {
            display: inline-block;
            margin-right: 5px;
            width: 14px;
            height: 14px;
        }
    }
`;
