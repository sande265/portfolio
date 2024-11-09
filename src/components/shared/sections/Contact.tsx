import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { scrollReveal, scrollRevealConfig } from '../../../helpers';
import { RootState } from '../../../redux/store';
import { usePrefersReducedMotion } from '../../hooks';

const Contact: React.FC = () => {

    const { aboutme } = useSelector(
        (state: RootState) => ({
            aboutme: state.about.abouts,
        }),
        shallowEqual,
    );

    const [about, setAbout] = useState<DataObj>({});
    const showContainer: MutableRefObject<any> = useRef(null);
    const reduceMotion: boolean = usePrefersReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;

        scrollReveal.reveal(showContainer.current, scrollRevealConfig());
    }, []);

    useEffect(() => {
        if (aboutme) {
            const activeAbout = aboutme.find(x => x.status);
            if (activeAbout) setAbout(activeAbout)
        }
    }, [aboutme])

    return (
        <Section id="contact" ref={showContainer}>
            <h2 className="numbered-heading overline">What’s Next?</h2>

            <h2 className="title">Get In Touch</h2>

            <p>
                Although I’m not currently looking for any new opportunities, my inbox is always
                open. Whether you have a question or just want to say hi, I’ll try my best to get
                back to you!
            </p>

            <div>
                <a className="email-link learn-more" href={`mailto:${about.email}`}>
                    Say Hello
                </a>
            </div>
            <div>
                <a className="email-link learn-more" href={`tel:${about.contact}`}>
                    Let&lsquo;s have a talk
                </a>
            </div>
        </Section>
    );
};

const Section = styled.section`
    max-width: 600px;
    margin: 0 auto 100px;
    text-align: center;

    @media (max-width: 768px) {
        margin: 0 auto 50px;
    }

    .overline {
        display: block;
        margin-bottom: 20px;
        color: var(--cyberpunk);
        font-family: var(--font-mono);
        font-size: var(--fz-md);
        font-weight: 400;

        &:before {
            bottom: 0;
            font-size: var(--fz-sm);
        }

        &:after {
            display: none;
        }
    }

    .title {
        font-size: clamp(40px, 5vw, 60px);
    }

    .email-link {
        ${({ theme }) => theme.mixins.bigButton};
        margin: 1rem auto;
    }
`;

export { Contact };
export default Contact;
