import styled from "styled-components";
import { About, Contact, Featured, Hero, Experiences, Projects } from "../shared/sections";

const Home: React.FC = ({ }) => {
    return <Container className="fillHeight">
        <Hero />
        <About />
        <Experiences />
        <Featured />
        <Projects />
        <Contact />
    </Container>
}

export { Home };
export default Home;

const Container = styled.main`
  counter-reset: section;
`;