import styled from 'styled-components';
import useFetchRegionData from '../../fetchDatas/useFetchRegionData';
import useFetchCities from '../../fetchDatas/useFetchCities';
import useFetchTowns from '../../fetchDatas/useFetchTowns';
import { Region } from '../../../../types/Region';

// 여기서 각 지역을 보여줍니다.
export const ShowRegion = ({isSelect}:{isSelect:(region:Region)=>void}) => {
    
    const {region} = useFetchRegionData();

    return (
        <ShowWrapper>
            {region.map((value)=>(
                <NameDiv 
                key={value.id}
                onClick={()=>isSelect(value)}
                >
                    {value.name}
                </NameDiv>
            ))}
        </ShowWrapper>
    );
};

export const ShowCities = ({id, isSelect} :{id:number, isSelect:(region:Region) => void}) => {
    
    const {cities} = useFetchCities(id);

    return (
        <ShowWrapper>
            {cities.map((value)=>(
                <NameDiv 
                key={value.id}
                onClick={()=>isSelect(value)}
                >
                    {value.name}
                </NameDiv>
            ))}
        </ShowWrapper>
    );
};

export const ShowTowns = ({id,isSelect} :{id:number, isSelect:(region:Region)=>void}) => {
    
    const {towns} = useFetchTowns(id);

    return(
        <ShowWrapper>
            {towns.map((value)=>(
                <NameDiv 
                key={value.id}
                onClick={()=>isSelect(value)}
                >
                    {value.name}
                </NameDiv>
            ))}
        </ShowWrapper>
    );
};

const ShowWrapper = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
margin-top: 10px;
`

const NameDiv = styled.div`
width: 32%;
height: 30px;
margin: 1px;
display: flex;
justify-content: center;
align-items: center;
background-color: #444444;
box-sizing: border-box;
color: #BBBBBB;
&:hover {
    border: 1px solid #c1f84d;
    color: white;
}
`