import React from 'react';
import styled from 'styled-components';

const LotacionHeader = () => {
    return (
        <BackContainer>
            <BackBtn>&lt;</BackBtn>
            <ContentDiv>내 동네 설정하기</ContentDiv>
        </BackContainer>
    );
};

export default LotacionHeader;

const BackContainer = styled.div`
display: flex;
flex-direction:row;
width: 80%;
align-items: center;
justify-content: center;
position: relative;
`

const BackBtn = styled.div`
color: white;
cursor: pointer;
justify-self: left;
position: absolute;
left: 0%;
`

const ContentDiv = styled.span`
font-weight: bold;
font-style: Pretendard;
color: white;
`