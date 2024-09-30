import React from 'react';
import styled from 'styled-components';
import { usePrevPathStore } from '../../zustand/usePrevPathStore';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

    const navigate = useNavigate();

    const {prevPath} = usePrevPathStore();

    const handleClose = () => {
        navigate(prevPath);
    }

    return (
        <Wrapper>
            <CloseBtn src='/images/X_2.png' alt='닫기' onClick={handleClose}/>
            <Container>
                <SearchBar
                placeholder='검색어를 입력하세요'
                />
            </Container>
        </Wrapper>
    );
};

export default SearchPage;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const CloseBtn = styled.img`
`

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SearchBar = styled.input`
    background-color: #444444;
    border-radius: 8px;
    width: 90%;
    height: 20px;
    border: none;
`