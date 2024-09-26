import React from 'react';
import styled from 'styled-components';

const SearchPage = () => {
    return (
        <Wrapper>
            <CloseBtn/>
            
        </Wrapper>
    );
};

export default SearchPage;

const Wrapper = styled.div`
    width: 90%;
`

const CloseBtn = styled.div`
    background-image: url('/images/X_2.png');
`