import React from 'react';
import styled from 'styled-components';

const AddBtn = () => {
    return (
        <Wrapper>
            <WrittenBtn src='/images/write_btn.png'/>
        </Wrapper>
    );
};

export default AddBtn;

const Wrapper = styled.div`
    width: 100%;
`

const WrittenBtn = styled.img`
position: fixed;
top: 85%;
left: 60%;
cursor: pointer;
`