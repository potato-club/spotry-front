import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Recommend from './Recommend';
import { useEffect, useState } from 'react';
import { getSearchTopTen } from '../../api/searchApi';

const SearchPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const [searchWord, setSearchWord] = useState<string[]>([]);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const response = await getSearchTopTen();
        console.log(response)
        setSearchWord(response); 
      } catch (error) {
        console.log('검색어 실패');
      }
    };
    fetchTop10();
  }, []);

  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedSearchWords = value.split(' ');  
    setSearchWord(updatedSearchWords);
  };

  return (
    <Wrapper>
      <CloseBtn src='/images/X_2.png' alt='닫기' onClick={handleClose} />
      <Container>
        <SearchBar
          placeholder='검색어를 입력하세요'
          value={searchWord.join(' ')} 
          onChange={handleChangeWord}
        />
        <SearhIcon src='/images/Search.png' alt='돋보기' />
      </Container>
      <Recommend UpdateInput={setSearchWord} /> 
    </Wrapper>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const CloseBtn = styled.img`
  position: relative;
  left: -42%;
  cursor: pointer;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SearchBar = styled.input`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  width: 100%;
  height: ${({ theme }) => theme.sizes.component.searchBar.height};
  border: none;
  margin-top: ${({ theme }) => theme.sizes.spacing.sm};
  padding-left: ${({ theme }) => theme.sizes.spacing.sm};
  box-sizing: border-box;
  padding-right: 30px;
  caret-color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.interactive.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const SearhIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-45%);
`;
