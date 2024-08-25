import styled from 'styled-components';
import LotacionHeader from './LotacionHeader';
import ShowLocation from './ShowLocation';

const MainLocation = () => {
    return (
        <Wrapper>
            <LotacionHeader/>
            <ShowLocation/>
        </Wrapper>
    );
};

export default MainLocation;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`