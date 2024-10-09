import styled from 'styled-components';

interface RecommenProps{
    UpdateInput: (input:string) => void;
}

const Recommend:React.FC<RecommenProps> = ({UpdateInput}) => {

    const word = ['서울','축구인원모집','러닝크루모집','브랜드 추천','검색어 추천','신고합니다','민폐','부산'];

    return (
        <Wrapper>
            <p>추천 검색어</p>
            <RecoWordDiv>
                {word.map((value,idx) => (
                    <RecoWord 
                    key={idx}
                    onClick={() => UpdateInput(value)}
                    >
                        {value}
                    </RecoWord>
                ))}
            </RecoWordDiv>
        </Wrapper>
    );
};

export default Recommend;

const Wrapper = styled.div`
    width: 90%;
    margin-top: 30px;
    p{
        color: #AFAFAF;
        font-size: 12px;
    }
`

const RecoWordDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const RecoWord = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #AFAFAF;
    border-radius: 4px;
    border: 1px solid #AFAFAF;
    margin-right: 8px;
    padding: 5px;
    box-sizing: content-box;
    font-size: 14px;
    cursor: pointer;
    flex-shrink: 0;
    margin-bottom: 8px;
`