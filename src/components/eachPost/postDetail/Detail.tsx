import styled from 'styled-components';

const Detail = () => {


    return (
        <Details>
            <ProfileWrapper>
                <Profile>
                    <img src='' alt='프로필'/>
                    <ProInfo>
                        <span>닉네임</span>
                        <span>위치/생성날</span>
                    </ProInfo>
                </Profile>
                <LikeDiv>
                    ♡
                    5
                </LikeDiv>
            </ProfileWrapper>
            <CategoryWrapper>
                <Category>
                    sport
                </Category>
                <Category>
                    모집 현황
                </Category>
            </CategoryWrapper>
            <ScriptDiv>
                <Title>
                    제목
                </Title>
                <DetailScript>
                이 편지는 영국에서 시작되어 행운을 전하기 위해 전해져 내려오는 편지입니다.
                이 편지를 받은 당신은 이미 행운을 손에 넣은 것입니다!
                단, 이 편지는 24시간 이내에 꼭 7명에게 전달해야 합니다.
                그렇지 않으면...
                행운이 날아가버리고 작은 불행이 찾아올지도 몰라요! 🙀

                ✨ 행운의 법칙 ✨
                1️⃣ 이 편지를 받고 미소 지어보세요. 😊

                오늘 하루 당신에게 좋은 일이 생길 거예요!
                2️⃣ 이 편지를 다른 7명에게 전해주세요.

                새로운 인연과 기쁜 소식이 찾아올 거예요!
                3️⃣ 편지를 전달한 뒤, 기다려보세요.

                당신이 상상하지 못한 행운이 문을 두드릴 거예요. 🚪✨
                이 작은 편지 한 장이 당신과 주변 사람들에게 얼마나 큰 행운을 가져다줄지 모릅니다.
                자, 지금 바로 행운을 나눠주세요! 🌟

                행운이 함께하길 바라며,
                당신의 하루가 빛나기를! 🌈

                P.S.
                믿거나 말거나, 행운은 당신의 손끝에서 시작됩니다! 😉
                </DetailScript>
            </ScriptDiv>
            <TagDiv>
                <Tags>
                    #축구
                </Tags>
                <Tags>
                    #농구
                </Tags>
            </TagDiv>
            <ViewConut>
                조회수
            </ViewConut>
        </Details>
    );
};

export default Detail;

const Details = styled.div`
width: 100%;
color: white;
padding: 15px;
box-sizing: border-box;
`

const ProfileWrapper = styled.div`
margin-top: 14px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const Profile = styled.div`
display: flex;
flex-direction: row;
align-items: center;
img{
    width: 32px;
    height: 32px;
}
`

const ProInfo = styled.div`
margin-left: 8px;
display: flex;
flex-direction: column;
font-size: 12px;
`

const LikeDiv = styled.div`
width: 65px;
height: 25px;
border: 1px solid #8D8D8D;
border-radius: 10px;
display: flex;
justify-content: space-evenly;
align-items: center;
color: #8D8D8D;
`

const CategoryWrapper = styled.div`
display: flex;
flex-direction: row;
`

const Category = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
border-radius: 10px;
background-color: #444444;
color: white;
padding: 4px 8px 4px 8px;
box-sizing: border-box;
font-size: 14px;
margin-top: 14px;
margin-bottom: 20px;
margin-left: 6px;
`;

const Title = styled.div`
font-weight: bold;
margin-bottom: 8px;
font-size: 15px;
`

const ScriptDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin-bottom: 16px;
`

const DetailScript = styled.div`
display: flex;
width: 100%; 
word-break: break-word;
font-size: 15px;
`;

const TagDiv = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 18px;
`
const Tags = styled.div`
margin-right: 8px;
color: #6983A9;
`

const ViewConut = styled.div`

`
