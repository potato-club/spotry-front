import styled from 'styled-components';

const MainHeader = () => {

    const handleSearch = () => {
        console.log('검색');
    }

    return (
        <HeadWrapper>
            <div>
                <select>
                    <option>종로</option>
                </select>        
                <img src='images/Search.png' alt='검색' onClick={handleSearch}/>
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
