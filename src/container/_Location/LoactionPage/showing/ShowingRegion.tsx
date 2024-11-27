// 여기서는 어떤 지역을 보여줄지 정하고 그 지역을 보여줍니다.
import { useState } from "react";
import { Region } from "../../../../types/Region";
import { ShowCities, ShowRegion, ShowTowns } from "./ShowRegion";
import Process from "../process/Process";
import styled from "styled-components";
import SelectInfo from "../selecInfo/SelectInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface HomeData {
    region: Region | null;
    city: Region | null;
    town: Region | null;
}


const ShowingRegion = () => {

    const navigate = useNavigate();

    const handleToMain = () => {
        if(addressArray.length > 0){
            handlePostAddress();
            navigate("/main");
        };
    }

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
            const townIds = addressArray
            .map((item) => item.town?.id)
            .filter((id) => id !== undefined) as number[];

            const response = await axios.post("http://sportry.site/region/select", {
            townIds: townIds, 
            });

            console.log("주소 전송 성공:", response.data);
        } catch (error) {
            console.error("주소 전송 실패:", error);
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