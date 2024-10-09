import React from 'react';
import styled from 'styled-components';
import MainHeader from './header/MainHeader';
import MainDocu from './mainDocument/MainDocu';

const Main:React.FC = () => {

    return (
        <Wrapper>
            <MainHeader/>
            <StyledHr/>
            <MainDocu/>
        </Wrapper>
    );
};

export default Main;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`

const StyledHr = styled.hr`
    width: 100%;
    color: white;
`