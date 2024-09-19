import React from 'react';
import styled from 'styled-components';
import { PopularData } from '../../tableData/PopularData';

const Popular = () => {

    

    return (
        <PopularWrapper>
            <div>
                <SectionTitle><strong>인기 게시글</strong></SectionTitle>
                <MoreBtn>더보기</MoreBtn>
            </div>
        </PopularWrapper>
    );
};

export default Popular;

const PopularWrapper = styled.div`
    width: 90%;
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const SectionTitle = styled.p`
    color: white;
`

const MoreBtn = styled.div`
    color: #AFAFAF;
    font-size: 14px;
`

