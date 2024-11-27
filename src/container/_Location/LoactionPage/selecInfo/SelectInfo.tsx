import styled from 'styled-components';
import { Region } from '../../../../types/Region';

interface HomeData{
    region:Region | null,
    city:Region | null,
    town:Region | null,
}

interface SelectInfoProps {
    selectedAddressArray: HomeData[];
    onDelete: (idx:number) => void;
}

const SelectInfo = ({ selectedAddressArray,onDelete }: SelectInfoProps) => {
    return (
        <TagContainer isAdded={selectedAddressArray.length > 0}>
            <div>
                {selectedAddressArray.length > 0 ? (
                    <>
                        {selectedAddressArray.map((region, idx) => (
                            <ChoiceLoca key={idx}>
                                <div>
                                    {region.region?.name} {region.city?.name} {region.town?.name}
                                    <Delete onClick={() => onDelete(idx)}/>
                                </div>
                            </ChoiceLoca>
                        ))}
                    </>
                ) : (
                    <>
                        <InfoIcon />
                        <span>원하는 지역을 상단의 + 버튼으로 추가할 수 있습니다.</span>
                    </>
                )}
            </div>
        </TagContainer>
    );
};

export default SelectInfo;

const TagContainer = styled.div<{isAdded:boolean}>`
width: 90%;
display: flex;
margin-top: 10px;
justify-content: ${(props)=>(props.isAdded) ? "flex-start" : "center"};
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
background-image: url('/images/Info.png');
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
background-image: url('/images/X.png');
width: 12px;
height: 12px;
background-position: center;
background-size: cover;
margin-left: 4px;
`