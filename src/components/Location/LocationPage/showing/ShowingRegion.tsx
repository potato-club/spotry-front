// 여기서는 어떤 지역을 보여줄지 정하고 그 지역을 보여줍니다.
import { useState } from "react";
import { Region } from "../../../../types/Region";
import { ShowCities, ShowRegion, ShowTowns } from "./ShowRegion";
import Process from "../process/Process";
import styled from "styled-components";
import SelectInfo from "../selectInfo/SelectInfo";
import { useNavigate } from "react-router-dom";
import { postAddress } from "../../../../api/fetchRegion";

interface HomeData {
    region: Region | null;
    city: Region | null;
    town: Region | null;
}

const ShowingRegion = () => {

    const navigate = useNavigate();

    const handleToMain = async () => {
        if (addressArray.length > 0) {
            try {
                await handlePostAddress(); 
                navigate("/main");          
            } catch (error) {
                alert("주소 전송을 실패했습니다. navigation x");
            }
        }
    };

    const [selectedRegion,setSelectedRegion] = useState<Region | null>(null);
    const [selectedCity,setSelectedCity] = useState<Region | null>(null);
    const [selectedTown,setSelectedTown] = useState<Region | null>(null);
    const [addressArray, setAddressArray] = useState<HomeData[]>([]);

    const handleSelectLocation = (region:Region, type:'region'|'city'|'town') => {
        switch(type){
            case "region":
            setSelectedRegion(region);
                break;
            case "city":
            setSelectedCity(region);
                break;
            case "town":
            setSelectedTown(region);
                break;
            default:
                break;
        };
    };

    const handleDeleteAddress = (idx: number) => {
        setAddressArray((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleAddAddress = () => {

        if(addressArray.length > 1){
            return
        };

        const newAddress: HomeData = {
            region: selectedRegion,
            city: selectedCity,
            town: selectedTown,
        };

        if (
            newAddress.region &&
            newAddress.city &&
            newAddress.town &&
            !addressArray.some(
                (item) =>
                    item.region?.id === newAddress.region?.id &&
                    item.city?.id === newAddress.city?.id &&
                    item.town?.id === newAddress.town?.id
            )
        ) {
            setAddressArray((prev) => [...prev, newAddress]);
        }

        setSelectedRegion(null);
        setSelectedCity(null);
        setSelectedTown(null);
    };

    const handlePostAddress = async () => {
        try {
            const townIds = addressArray[0].city?.id
            if (townIds === undefined) {
                alert('올바른 cityId 값을 찾을 수 없습니다.');
                return;
            }
            const response = await postAddress(townIds);
        } catch (error) {
            throw error;
        };
    };

    return (
        <Wrapper>
            <Process
            region={selectedRegion}
            city={selectedCity}
            town={selectedTown}
            addSelection={handleAddAddress}
            />
            <SelectInfo 
            selectedAddressArray={addressArray}
            onDelete={handleDeleteAddress}
            />
            <ShowingWrapper>
                {selectedRegion ? (
                    <>
                    {!selectedCity && (
                        <ShowCities 
                        id={selectedRegion?.id}
                        isSelect={(city) => handleSelectLocation(city,'city')}
                        />
                    )}
                        
                    {selectedCity && 
                        <ShowTowns 
                        id={selectedCity?.id}
                        isSelect={(town) => handleSelectLocation(town,'town')}
                        />}
                    </>
                ) : (
                    <ShowRegion
                    isSelect={(region) => handleSelectLocation(region,'region')}
                    />
                )}
            </ShowingWrapper>
            <DoneBtn 
            isAddressAdded={addressArray.length > 0}
            onClick={handleToMain}/>
        </Wrapper>
    );
};

export default ShowingRegion;

const Wrapper = styled.div`
width: 100%;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`

const ShowingWrapper = styled.div`
width: 90%;
`

const DoneBtn = ({ isAddressAdded, onClick }: { isAddressAdded: boolean; onClick: () => void }) => {
return (
    <>
        <FinishBtn isAddressAdded={isAddressAdded} onClick={onClick}>
            완료
        </FinishBtn>
    </>
);
};

const FinishBtn = styled.button<{ isAddressAdded: boolean }>`
position: fixed;
width: 330px;
height: 45px;
border-radius: 14px;
bottom: 0px;
margin-bottom: 20px;
background-color: #555555;
color: ${(props) => (props.isAddressAdded ? "#ffffff" : "#cdcdcd")};
transition: transform 0.1s;
&:active {
transform: scale(0.9);
}
`;