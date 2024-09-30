import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePrevPathStore } from '../../../zustand/usePrevPathStore';
import { useLocationStore } from '../../../zustand/useLocationStore';

const MainHeader: React.FC = () => {

    const {towns} = useLocationStore();
    
    const {setPrevPath} = usePrevPathStore();

    const navigation =useNavigate();

    const handleToSearch = () => {
        setPrevPath("/main");
        navigation("/Search");
    }

    return (
        <HeadWrapper>
            <div>
                <TownSelect>
                    {towns.map((house,idx) => {
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
                        } else if(house.city){
                            return(
                                <TownOption
                                key={idx}>
                                    {house.city}
                                </TownOption>
                            );
                        } else{
                            return(
                                <div>데이터가 없습니다</div>
                            )
                        }
                    })}
                </TownSelect>        
                <img src='/images/Search.png' alt='검색' onClick={handleToSearch}/>
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