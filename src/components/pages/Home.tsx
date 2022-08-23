import styled from "styled-components";
import { Hero } from "../shared/sections";

const Home: React.FC = ({ }) => {
    return <Container className="fillHeight">
        <Hero />
    </Container>
}

export { Home };
export default Home;

const Container = styled.main`
  counter-reset: section;
`;