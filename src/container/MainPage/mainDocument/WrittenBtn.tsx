import React from 'react';
import styled from 'styled-components';

const WrittenBtn = () => {
    return (
        <>
            <Written src='/images/write_btn.png'/>
        </>
    );
};

export default WrittenBtn;

const Written = styled.img`
position: fixed;
bottom: 75px;
left: calc(50% + 135px);
transform: translateX(-50%);
cursor: pointer;
`
