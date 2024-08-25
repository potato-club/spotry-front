import React, { useState } from 'react';
import styled from 'styled-components';
import { LocationData } from './LocationData';


const ShowLocation: React.FC= () => {

    const [selectCity,setSelectCity] = useState<string>('');

    const cities = LocationData.map(location => location.city);

    return (
        <LocaWrapper>
            {cities.map(city=><LocaInfo>{city}</LocaInfo>)}
        </LocaWrapper>
    );
};

export default ShowLocation;

const LocaWrapper = styled.div`
margin-top: 20px;
width:90%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

const LocaInfo = styled.div`
cursor: pointer;
width: 30%;
height: 30px;
color: white;
margin: 1px;
display: flex;
justify-content: center;
align-items: center;
background-color: #444444;
box-sizing: border-box;
&:hover{
    border: 1px solid #C1F84D;
}
`
