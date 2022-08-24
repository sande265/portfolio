import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { usePrefersReducedMotion } from '../../hooks';

const jobsArray: Array<DataObj> = [
  {
    organization: 'Genius Systems',
    website: 'https://geniussystems.com.np',
    logo: 'https://media.wimo.geniussystems.com.np/wimo/media-management/genius_250-f868487c-50d8-453e-8add-ce6a120246b3.png',
    location: 'Dhobighat, Lalitpur Nepal',
    country: 'Nepal',
    duration: 'Jan 2021 - Present',
    title: 'Software Enginner',
    html: `
    <ul>
        <li>Write modern, performant, maintainable code for a diverse array of client and internal projects</li>
        <li>Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify</li>
        <li>Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis</li>
    </ul>`,
  },
  {
    organization: 'NETTV',
    website: 'https://nettv.com.np',
    location: 'Jawlakhel, Lalitpur Nepal',
    country: 'Nepal',
    duration: 'Aug 2018 - Feb 2019',
    title: 'Intern',
    html: `
    <ul>
        <li>Write modern, performant, maintainable code for a diverse array of client and internal projects</li>
        <li>Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify</li>
        <li>Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis</li>
    </ul>`,
  },
  {
    organization: 'Vianet',
    website: 'https://vianet.com.np',
    location: 'Dhobighat, Lalitpur Nepal',
    country: 'Nepal',
    duration: 'Apr 2018 - Mar 2020',
    title: 'Network Trainee',
    html: `
    <ul>
        <li>Write modern, performant, maintainable code for a diverse array of client and internal projects</li>
        <li>Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify</li>
        <li>Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis</li>
    </ul>`,
  },
];

const Jobs: React.FC = () => {
  const showContainer: MutableRefObject<any> = useRef(null);
  const reduceMotion: boolean = usePrefersReducedMotion();

  const [activeTabId, setActiveTab] = useState<number>(0);
  const tabs: any = useRef([]);

  useEffect(() => {
    if (reduceMotion) return;

    scrollReveal.reveal(showContainer.current, scrollRevealConfig());
  }, []);

  return (
    <Section id="jobs" ref={showContainer}>
      <h2 className="numbered-heading">Places I’ve Worked</h2>
      <div className="inner">
        <TabList role="tablist" aria-label="Jobs Tab">
          {jobsArray?.map((job: DataObj, idx: number) => {
            const { organization } = job;
            return (
              <TabButton
                key={idx}
                role="tab"
                isActive={activeTabId === idx}
                onClick={() => setActiveTab(idx)}
                ref={(el: Element) => (tabs.current[idx] = el)}
                id={`tab-${idx}`}
                tabIndex={activeTabId === idx ? 0 : -1}
                aria-selected={activeTabId === idx ? true : false}
                aria-controls={`panel-${idx}`}>
                <span>{organization}</span>
              </TabButton>
            );
          })}
          <Highlight activeTabId={activeTabId} />
        </TabList>
        <TabPanels>
          {jobsArray?.map((job: DataObj, idx: number) => {
            const { title, website, organization, range, html } = job;
            return (
              <CSSTransition key={idx} timeout={250} classNames="fade">
                <TabPanel
                  id={`panel-${idx}`}
                  role="tabpanel"
                  tabIndex={activeTabId === idx ? 0 : -``}
                  aria-labelledby={`tab-${idx}`}
                  aria-hidden={activeTabId !== idx}
                  hidden={activeTabId !== idx}>
                  <h3>
                    <span>{title}</span>
                    <span className="company">
                      &nbsp;@&nbsp;
                      <a href={website} rel="noreferrer" target="_blank" className="inline-link">
                        {organization}
                      </a>
                    </span>
                  </h3>

                  <p className="range">{range}</p>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </TabPanel>
              </CSSTransition>
            );
          })}
        </TabPanels>
      </div>
    </Section>
  );
};

export { Jobs };
export default Jobs;

const Section = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;
const TabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const TabButton: any = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }: any) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const Highlight: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }: any) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }: any) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const TabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const TabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
      cursor: pointer;
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;
