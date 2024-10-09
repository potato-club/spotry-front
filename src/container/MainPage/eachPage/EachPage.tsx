import styled from 'styled-components';
import MainHeader from '../header/MainHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PopularData } from '../../../tableData/PopularData';

const EachPage = () => {

    const navigation = useNavigate();

    const [resultPost,setResultPost] = useState(PopularData);

    return (
        <>
            <MainHeader/>
            <StyledHr/>
            {resultPost.map((value,idx) => (
                <PostInfoDiv key={idx}>
                    {value.category}
                </PostInfoDiv>
            ))}
        </>
    );
};

export default EachPage;

const PostInfoDiv = styled.div`
height: 135px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
border-bottom: 1px solid #8D8D8D;
`

const StyledHr = styled.hr`
    width: 100%;
    color: white;
`