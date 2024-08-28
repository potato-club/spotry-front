import React, { useState } from "react";
import styled from "styled-components";
import { LocationData } from "./LocationData";
import { Btn } from "../../styles/Container";

const ShowLocation: React.FC = () => {
    const [selectCity, setSelectCity] = useState<string>("");  // 도시
    const [isCitySelected, setIsCitySelected] = useState<boolean>(false);
    const [selectDistrict, setSelectDistrict] = useState<string>(""); // 구
    const [isDistrictSelected, setIsDistrictSelected] = useState<boolean>(false);
    const [selectNeighborhood, setSelectNeighboorhood] = useState<string>(""); // 동
    const [isNeightboorhood, setIsNeighboorhood] = useState<boolean>(false);

    const cities = LocationData.map((location) => location.city);

    const handleNotYet = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsCitySelected(false);
        setIsDistrictSelected(false);
        setIsNeighboorhood(false);
        setSelectCity("");
        setSelectDistrict("");
        setSelectNeighboorhood("");
    }

    const handleSelectCity = (e: React.MouseEvent<HTMLDivElement>) => {
        const selectedCity = e.currentTarget.textContent;
        if (selectedCity && selectedCity !== selectDistrict) {
            setSelectCity(selectedCity);
            setIsDistrictSelected(false);
            setIsNeighboorhood(false);
        } else {
            setSelectCity(selectCity);
            setIsDistrictSelected(false);
            setIsNeighboorhood(false);
            setSelectNeighboorhood("");
            setSelectDistrict("");
        }
        setIsCitySelected(true);
    };

    const handleSelectDistrict = (e:React.MouseEvent<HTMLDivElement>) => {
        const selectedDistrict = e.currentTarget.textContent;
        if(selectedDistrict && selectedDistrict !== selectNeighborhood){
            setSelectDistrict(selectedDistrict);
            setIsNeighboorhood(false);
        } else{
            setSelectDistrict(selectDistrict);
            setIsNeighboorhood(false);
            setSelectNeighboorhood("");
        }
        setIsDistrictSelected(true);
    }

    const handleSelectNeighboorhood = (e:React.MouseEvent<HTMLDivElement>) => {
        const seletedNB = e.currentTarget.textContent;
        if(seletedNB){
            setSelectNeighboorhood(seletedNB);
        }
        setIsNeighboorhood(true);
    }

    {
        /* 얘는 시 이름 이중 배열*/
    }

    const districts = LocationData.filter(
        (location) => location.city === selectCity
    )
        .map((location) => location.districts.map((location) => location.district))
        .flat();

    const neighboorhood = LocationData.filter(
        (location) => location.city === selectCity
    )
        .flatMap((loaction) => 
        loaction.districts
            .filter((district)=>district.district === selectDistrict)
            .flatMap((district)=>district.neighborhoods)
    );

    return (
        <BackWrapper>
            <ProDiv>
                <Progress>
                    <ProgressDiv isSelect={isCitySelected} onClick={handleNotYet}>{selectCity ? `${selectCity}` : "시/도"}</ProgressDiv>
                    &gt; 
                    <ProgressDiv isSelect={isDistrictSelected} onClick={handleSelectCity}>{selectDistrict ? `${selectDistrict}` : "시/군/구"}</ProgressDiv>
                    &gt; 
                    <ProgressDiv isSelect={isNeightboorhood} onClick={handleSelectDistrict}>{selectNeighborhood ? `${selectNeighborhood}` : "읍/면/동"}</ProgressDiv>
                </Progress>
                <LocaIcon/>
            </ProDiv>
            
            <LocaWrapper>
                {!isCitySelected
                ? cities.map((city) => (
                    <LocaInfo key={city} onClick={handleSelectCity}>
                        {city}
                    </LocaInfo>
                    ))
                :  !isDistrictSelected 
                ? districts.map((dis) => (
                    <LocaInfo key={dis} onClick={handleSelectDistrict}>
                        {dis}
                    </LocaInfo>)) 
                : neighboorhood.map((neigh) => (
                    <LocaInfo key={neigh.neighborhood} onClick={handleSelectNeighboorhood}>
                        {neigh.neighborhood}
                    </LocaInfo>
                ))}
            </LocaWrapper>
            {
                isNeightboorhood ? <DoneBtn>선택 완료</DoneBtn> : " "
            }
        </BackWrapper>
    );
};

export default ShowLocation;

const BackWrapper = styled.div`
margin-top: 20px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
`

const Progress = styled.div`
width: 75%;
color:#C1F84D;
background-color: #444444;
height: 48px;
display: flex;
flex-direction: row;
justify-content:center;
align-items: center;
border-radius: 12px;
`

const ProgressDiv = styled.div<{isSelect:boolean}>`
cursor: pointer;
width: 30%;
font-size: 10px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: ${(props)=>(props.isSelect) ? "white" : "#BBBBBB"};
`

const LocaWrapper = styled.div`
margin-top: 20px;
width: 90%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
`

const LocaIcon = styled.div`
background-image: url('images/gps.png');
width: 48px;
height: 48px;
background-position: center;
background-size: cover;
`

const LocaInfo = styled.div`
cursor: pointer;
width: 30%;
height: 30px;
color: #BBBBBB;
margin: 1px;
display: flex;
justify-content: center;
align-items: center;
background-color: #444444;
box-sizing: border-box;
&:hover {
    border: 1px solid #c1f84d;
    color: white;
}
`

const DoneBtn = styled(Btn)`
width: 80%;
height: 45px;
border-radius: 14px;
margin-top: auto;
margin-bottom: 20px;
`

const ProDiv = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`