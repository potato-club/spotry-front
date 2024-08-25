import React, { useState } from 'react';
import styled from 'styled-components';
import { LocationData } from './LocationData';


const ShowLocation: React.FC= () => {

    const [selectCity,setSelectCity] = useState<string>('');
    const [isCitySelected, setIsCitySelected] = useState<boolean>(false);


    const cities = LocationData.map(location => location.city);

    const handleSelectCity = (e: React.MouseEvent<HTMLDivElement>) => {
        const selectedCity = e.currentTarget.textContent;
        if(selectedCity){
            setSelectCity(selectedCity)}
            setIsCitySelected(prev=>!prev);
    }

    {/* 얘는 시 이름 이중 배열*/}
    const districts = LocationData
    .filter(location => location.city === selectCity)
    .map(location=>location.districts.map(location=>location.district))
    .flat();

    console.log(districts);

    return (
        <LocaWrapper>
            {
                !isCitySelected ? cities.map(city=>
                    <LocaInfo key={city} onClick={handleSelectCity}>{city}</LocaInfo>) 
                    : districts.map(dis =><LocaInfo>{dis}</LocaInfo>)
            }
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
