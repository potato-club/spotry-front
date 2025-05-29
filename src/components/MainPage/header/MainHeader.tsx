import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserRegion } from '../../../api/regionApi';

const MainHeader: React.FC = () => {
    
    const [myCity, setMyCity] = useState<any>();
    const navigation = useNavigate();

    const handleToSearch = () => {
        navigation("/search");
    };

    const fetchMyCity = async () => {
        try {
            const response = await getUserRegion();
            setMyCity(response.data);
        } catch (error) {
            alert("지역 불러오기 실패");
        }
    }

    useEffect(() => {
        fetchMyCity();
    },[]);

    return (
        <HeadWrapper>
            <div>
                <TownSelect>
                   <TownOption>
                        {myCity}
                   </TownOption>
                </TownSelect>        
                <img src='/images/Search.png' alt='검색' onClick={handleToSearch}/>
            </div>
            <StyledHr/>
        </HeadWrapper>
    );
};

export default MainHeader;

const HeadWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  position: fixed;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
  width: ${({ theme }) => theme.sizes.component.header.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.sizes.spacing.sm};
  z-index: ${({ theme }) => theme.sizes.zIndex.header};
  
  div {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    img {
      cursor: pointer;
    }
  }
  
  left: 50%;
  transform: translateX(-50%);
`;               

const TownSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.utility.transparent};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
`;

const TownOption = styled.option`
  background-color: ${({ theme }) => theme.colors.background.quaternary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledHr = styled.hr`
  width: 100%;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.background.quaternary};
`;