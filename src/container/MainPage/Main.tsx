import React from 'react';
import styled from 'styled-components';
import MainHeader from './header/MainHeader';
import Hot from './Hot';
import Popular from './Popular';
import UpComing from './UpComing';
import WrittenBtn from './WrittenBtn';

const Main:React.FC = () => {

    return (
        <Wrapper>
            <MainHeader/>
            <StyledHr/>
            <Hot/>
            <Popular/>
            <UpComing/>
            <WrittenBtn/>
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