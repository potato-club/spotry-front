import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface HouseAddress {
    city: string;
    district: string;
    neighbor: string;
}

const MainHeader: React.FC = () => {
    
    const location = useLocation();
    const House = location.state as HouseAddress[];
    
    const handleSearch = () => {
        console.log('검색');
    }

    // console.log(House);
    // console.log(typeof(House));
    // console.log(Array.isArray(House));

    return (
        <HeadWrapper>
            <div>
                <TownSelect>
                    {House.map((house,idx) => {
                        if(house.neighbor){
                            return(
                                <TownOption 
                                key={idx}>
                                    {house.neighbor}
                                </TownOption>
                            );
                        } else if(house.district){
                            return (
                                <TownOption
                                key={idx}>
                                    {house.district}
                                </TownOption>
                            );
                        } else{
                            return(
                                <TownOption
                                key={idx}>
                                    {house.city}
                                </TownOption>
                            );
                        }
                    })}
                </TownSelect>        
                <img src='/images/Search.png' alt='검색' onClick={handleSearch}/>
            </div>
        </HeadWrapper>
    );
};

export default MainHeader;

const HeadWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        img{
            cursor: pointer;
        }
        align-items: center;
    }
`               

const TownSelect = styled.select`
    background-color: transparent;
    color: white;
    border: none;
`

const TownOption = styled.option`
    background-color: #555555;
`