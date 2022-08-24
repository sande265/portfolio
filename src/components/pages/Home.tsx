import styled from "styled-components";
import { About, Hero, Jobs } from "../shared/sections";

const Home: React.FC = ({ }) => {
    return <Container className="fillHeight">
        <Hero />
        <About />
        <Jobs />
    </Container>
}

export { Home };
export default Home;

const Container = styled.main`
  counter-reset: section;
`;