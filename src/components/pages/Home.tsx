import styled from 'styled-components';
import Layout from '../routes/Layout';
import { About, Contact, Featured, Hero, Experiences, Projects } from '../shared/sections';

const Home: React.FC = ({}) => {
    return (
        <Layout>
            <Container className="fillHeight">
                <Hero />
                <About />
                <Experiences />
                <Featured />
                <Projects />
                <Contact />
            </Container>
        </Layout>
    );
};

export { Home };
export default Home;

const Container = styled.main`
    counter-reset: section;
`;
