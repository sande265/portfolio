import { Fragment, MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { usePrefersReducedMotion } from '../../hooks';
import ProfilePic from '../../../assets/images/profile.jpg';

const About: React.FC = () => {
  const showContainer: MutableRefObject<any> = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    scrollReveal.reveal(showContainer.current, scrollRevealConfig());
  }, []);

  const libs: string[] = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.JS',
    'Node.JS',
    'WordPress',
    'Laravel',
    'MySQL',
    'Postgres',
    'MongoDB',
    'C++',
    'Java',
  ];

  const works: Array<DataObj> = [
    { url: 'https://geniussystems.com.np', info: 'a startup' },
    { url: 'https://vianet.com.np', info: 'An Internet Company' },
    { url: 'https://nettv.com.np', info: "Nepal's 1st IPTV provider" },
  ];

  return (
    <AboutSection id="about" ref={showContainer}>
      <h2 className="numbered-heading">What I Do</h2>
      <div className="inner">
        <Text>
          <div>
            <p>
              Hi! Let me introduce myself My name is Sandesh and I create things for the internet.
              My interest in web development started back in 2018 when I decided to try to impress
              my fellow students by creating &amp; modifying websites. I also casually do Native
              apps development for TVs, Mobile &amp; Desktops
            </p>
            <p>
              Today, and I’ve had the privilege of working at{' '}
              {works?.map((work, idx) => (
                <Fragment key={idx}>
                  <a href={work.url}>
                    {work.info}
                    {idx !== works.length - 1 && ','}&nbsp;
                  </a>
                </Fragment>
              ))}
            </p>
            <p>technologies I am friendly with:</p>
          </div>
          <ul className="skills-list">
            {libs?.map((lib, idx) => (
              <li key={idx}>{lib}</li>
            ))}
          </ul>
        </Text>
        <Pic>
          <div className="wrapper">
            <img src={ProfilePic} alt="" className="img" />
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
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
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
    background-color: var(--green);

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
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;
