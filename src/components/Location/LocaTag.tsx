import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface House {
    city:string;
    district:string;
    neighbor:string;
}

interface LocaTagProps{
    Houses: House[];
    DeleteHouse: (idx:number) => void;
}

const LocaTag:React.FC<LocaTagProps> = ({Houses, DeleteHouse}) => {

    const [Length, setLength] = useState<number>(0);

    const [isReal,setIsReal] = useState<boolean>(false);



    useEffect(()=>{
        setLength(Houses.length);
        if(Length !== 0){
            setIsReal(true);
        } else{
            setIsReal(false);
        }
    },[Houses, Length]);

    return (
        <TagContainer isReal={isReal}>
            <div>
                {isReal ? (
                    <>
                        {Houses.map((house,idx)=><ChoiceLoca key={idx}>
                            <div>
                                {house.city} {house.district} {house.neighbor} 
                                <Delete onClick={() => DeleteHouse(idx)}/>
                            </div>
                        </ChoiceLoca>)}
                    </>
                )
                :
                (<>
                    <InfoIcon/>
                    <span>원하는 지역을 상단의 + 버튼으로 추가할 수 있습니다.</span>
                </>)}
                
            </div>
        </TagContainer>
    );
};

export default LocaTag;

const TagContainer = styled.div<{isReal:boolean}>`
width: 90%;
display: flex;
margin-top: 10px;
justify-content: ${(props)=>(props.isReal) ? "flex-start" : "center"};
height: 32px;
div{
    display: flex;
    align-items: center;
}
span{
    color:#8D8D8D;
    font-size: 12px;
    margin-left: 4px;
}
`

const InfoIcon = styled.div`
background-image: url('images/Info.png');
width: 10px;
height: 10px;
background-position:center;
background-size: cover;
`

const ChoiceLoca = styled.div`
display: flex;
justify-content: center;
height: 32px;
background-color: #444444;
border-radius: 8px;
color: #FFFFFF;
font-size:10px;
margin-right: 10px;
padding-left: 4px;
padding-right: 4px;
div{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    margin-right: 2px;
}
`

const Delete = styled.div`
cursor: pointer;
background-image: url('images/X.png');
width: 12px;
height: 12px;
background-position: center;
background-size: cover;
margin-left: 4px;
`