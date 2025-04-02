import React from 'react';
import styled from 'styled-components';

interface RecommendProps {
  UpdateInput: React.Dispatch<React.SetStateAction<string[]>>;
}

const Recommend = ({ UpdateInput }: RecommendProps) => {
  const handleUpdateInput = (input: string) => {
    const updatedArray = input.split(' '); 
    UpdateInput(updatedArray);
  };

  return (
    <Wrapper>
        <RecoWordDiv>
      <RecoWord onClick={() => handleUpdateInput("추천 검색어")}>추천 검색어</RecoWord>
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
    flex-wrap: wrap;
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
    flex-shrink: 0;
    margin-bottom: 8px;
`