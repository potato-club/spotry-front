import React from 'react';
import styled from 'styled-components';

const Recommend = () => {
    return (
        <Wrapper>
            <p>추천 검색어</p>
            <RecoWordDiv>
                <RecoWord>2</RecoWord>
                <RecoWord>3214</RecoWord>
                <RecoWord>421624237</RecoWord>
                <RecoWord>12135</RecoWord>
            </RecoWordDiv>
        </Wrapper>
    );
};

export default Recommend;

const Wrapper = styled.div`
    width: 90%;
    margin-top: 30px;
    p{
        color: #AFAFAF;
        font-size: 12px;
    }
`

const RecoWordDiv = styled.div`
    display: flex;
    flex-direction: row;
`

const RecoWord = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #AFAFAF;
    border-radius: 4px;
    border: 1px solid #AFAFAF;
    margin-right: 8px;
    padding: 5px;
    box-sizing: content-box;
    font-size: 14px;
    cursor: pointer;
`