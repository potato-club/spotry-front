import styled from 'styled-components';
import LocationHeader from './header/LocationHeader';
import ShowingRegion from './showing/ShowingRegion';

const MainLocation = () => {
    return (
        <Wrapper>
                <LocationHeader/>
                <ShowingRegion/>
        </Wrapper>
    );
};

export default MainLocation;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  box-sizing: border-box;
`;
