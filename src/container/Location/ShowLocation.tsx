import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { LocationData } from "../../tableData/LocationData";
import { Btn } from "../../styles/Container";
import LocaTag from "./LocaTag";
import { useNavigate } from "react-router-dom";

interface HouseAddress {
    city:string;
    district:string;
    neighbor:string;
}

const ShowLocation: React.FC = () => {

    const navigate = useNavigate();

    const handleDone = () => {
        if(House.length > 0){
            navigate("/main", {state : House});
        }
    }

    const [House,setHouse] = useState<HouseAddress[]>([]);

    console.log(House);

    const [selectCity, setSelectCity] = useState<string>("");  // 도시
    const [isCitySelected, setIsCitySelected] = useState<boolean>(false);
    const [selectDistrict, setSelectDistrict] = useState<string>(""); // 구
    const [isDistrictSelected, setIsDistrictSelected] = useState<boolean>(false);
    const [selectNeighborhood, setSelectNeighboorhood] = useState<string>(""); // 동
    const [isNeightboorhood, setIsNeighboorhood] = useState<boolean>(false);
    const [isFull,setIsFull] = useState<boolean>(false);

    useEffect(()=>{
        if(House.length < 2){
            setIsFull(false);
        } else{
            setIsFull(true);
        }
    },[House])

    const cities = LocationData.map((location) => location.city);

    const handleHouse = () => {
        const newHouse: HouseAddress = {
            city:selectCity,
            district:selectDistrict,
            neighbor:selectNeighborhood,
        }
        if(House.length < 2 && newHouse.city !== "" && checkJungbog([...House,newHouse])){
            setHouse((prev) => [...prev, newHouse]);
            handleNotYet();
        }
        if(House.length === 2){
            alert('최대 2개의 주소만 선택 가능합니다');
        }
    }

    const DeleteHouse = (idx:number) => {
        setHouse(prev => prev.filter((HouseAddress, i) => i !== idx));
    }

    const handleNotYet = () => {
        setIsCitySelected(false);
        setIsDistrictSelected(false);
        setIsNeighboorhood(false);
        setSelectCity("");
        setSelectDistrict("");
        setSelectNeighboorhood("");
    }

    const checkJungbog = (arr:HouseAddress[]) => {
        
        if(arr.length <= 1) return true;

        const [frist, second] = arr;

        if(frist.city === second.city 
            && frist.district === second.district 
            && frist.neighbor === second.neighbor){
            handleNotYet();
                alert('중복입니다');
                return false;
            };
        return true;
    };

    // handle 도시들 로직이 너무 복잡함, 근데 어떻게 줄일지 모르겠음
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
                    <ProgressDiv 
                        isSelect={isCitySelected} 
                        onClick={handleNotYet}> {selectCity ? `${selectCity}` : "시/도"}
                        </ProgressDiv>
                    <ToDiv/>
                    <ProgressDiv 
                        isSelect={isDistrictSelected} 
                        onClick={handleSelectCity}>{selectDistrict ? `${selectDistrict}` : "시/군/구"}</ProgressDiv>
                    <ToDiv/>
                    <ProgressDiv 
                        isSelect={isNeightboorhood} 
                        onClick={handleSelectDistrict}>{selectNeighborhood ? `${selectNeighborhood}` : "읍/면/동"}</ProgressDiv>
                </Progress>
                <LocaIcon onClick={handleHouse}/>
            </ProDiv>

            <LocaTag Houses={House} DeleteHouse={DeleteHouse}/>

            <LocaWrapper>
                {!isCitySelected
                    ? cities.map((city) => (
                        <LocaInfo 
                            key={city} 
                            onClick={handleSelectCity}
                            isSelected={selectCity===city}>
                            {city}
                        </LocaInfo>
                        ))
                        :  !isDistrictSelected 
                        ? districts.map((dis) => (
                            <LocaInfo 
                            key={dis} 
                            onClick={handleSelectDistrict}
                            isSelected={selectDistrict===dis}>
                                {dis}
                            </LocaInfo>)) 
                        : neighboorhood.map((neigh) => (
                            <LocaInfo 
                                key={neigh.neighborhood} 
                                onClick={handleSelectNeighboorhood}
                                isSelected={selectNeighborhood===neigh.neighborhood}>
                                {neigh.neighborhood}
                            </LocaInfo>))
                }
            </LocaWrapper>
            <DoneBtn 
            isFull={isFull}
            onClick={handleDone}
            >완료하기</DoneBtn>
            {/* {isNeightboorhood ? <DoneBtn>선택 완료</DoneBtn> : " "} */}
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
pointer-events: ${(props)=>(props.isSelect ? "auto" : "none")};
`

const LocaWrapper = styled.div`
margin-top: 10px;
width: 90%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
`

const LocaIcon = styled.div`
cursor: pointer;
background-image: url('/images/plus.png');
width: 48px;
height: 48px;
background-position: center;
background-size: cover;
transition: transform 0.1s;
&:active{
    transform: scale(0.9);
}
`

const LocaInfo = styled.div<{isSelected:boolean}>`
cursor: pointer;
width: 30%;
height: 30px;
color: ${(props)=>(props.isSelected) ? "white" : "#BBBBBB"};
margin: 1px;
display: flex;
justify-content: center;
align-items: center;
background-color: #444444;
box-sizing: border-box;
border: ${(props)=>(props.isSelected) ? "1px solid #c1f84d" : "none"};
&:hover {
    border: 1px solid #c1f84d;
    color: white;
}
`

const DoneBtn = styled(Btn)<{isFull:boolean}>`
width: 80%;
height: 45px;
border-radius: 14px;
margin-top: auto;
margin-bottom: 20px;
background-color: #555555;
color: ${(props)=>(props.isFull) ? "white": "#CDCDCD"};
transition: transform 0.1s;
&:active{
    transform: scale(0.9);
};
pointer-events: ${(props)=>(props.isFull ? "auto" : "none")};
`

const ProDiv = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`

const ToDiv = styled.div`
background-image: url('/images/arrow.png');
width: 4px;
height: 8px;
background-position: center;
background-size: cover;
`
