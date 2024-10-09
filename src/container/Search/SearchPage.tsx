import styled from 'styled-components';
import { usePrevPathStore } from '../../zustand/usePrevPathStore';
import { useNavigate } from 'react-router-dom';
import Recommend from './Recommend';
import useClickSearchInput from '../../hook/useClickSearchInput';

const SearchPage = () => {

    const navigate = useNavigate();

    const {prevPath} = usePrevPathStore();

    const handleClose = () => {
        navigate(prevPath);
    }

    const {clickSearchInput,UpdateInput} = useClickSearchInput();

    return (
        <Wrapper>
            <CloseBtn src='/images/X_2.png' alt='닫기' onClick={handleClose}/>
            <Container>
                <SearchBar
                placeholder='검색어를 입력하세요'
                value={clickSearchInput}
                onChange={(e) => UpdateInput(e.target.value)}
                />
                <SearhIcon src='/images/Search.png' alt='돋보기'/>
            </Container>
            <Recommend UpdateInput={UpdateInput}/>
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
`
const CloseBtn = styled.img`
position: relative;
left: -42%;
cursor: pointer;
`

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const SearchBar = styled.input`
    background-color: #444444;
    color: white;
    border-radius: 8px;
    width: 100%;
    height: 48px;
    border: none;
    margin-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;
    padding-right: 30px;
    caret-color: white;
    &:focus{
        outline: none;
    }
`

const SearhIcon = styled.img`
    position: absolute;
    right: 10px;
    top: 55%;
    transform: translateY(-45%);
`