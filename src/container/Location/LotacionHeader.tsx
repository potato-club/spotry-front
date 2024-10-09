import React from 'react';
import styled from 'styled-components';

const LotacionHeader = () => {
    return (
        <BackContainer>
            <BackBtn/>
            <ContentDiv>내 동네 설정하기</ContentDiv>
        </BackContainer>
    );
};

export default LotacionHeader;

const BackContainer = styled.div`
margin-top: 20px;
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
background-image: url('/images/backBtn.png');
width: 32px;
height: 32px;
background-position: center;
background-size: cover;
`

const ContentDiv = styled.span`
font-weight: bold;
font-style: Pretendard;
color: white;
`