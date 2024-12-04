import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = () => {

    const {postId} = useParams();

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
                    좋아요
                </LikeDiv>
            </ProfileWrapper>
            <Category>
                <div>카테고리</div>
                <div>모집임박</div>
            </Category>
            <ScriptDiv>
                <Title>
                    postId : {postId}
                </Title>
                <DetailScript>
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                    ddddddddddddddddddddddddddddddddddddddddddd
                </DetailScript>
            </ScriptDiv>
            <TagDiv>
                <Tags>
                    #축구 #농구
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
padding:10px;
box-sizing: border-box;
`

const ProfileWrapper = styled.div`
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
`

const ProInfo = styled.div`
display: flex;
flex-direction: column;
`

const LikeDiv = styled.div`

`

const Category = styled.div`
width: 30%;
display: flex;
flex-direction: row;
justify-content: space-between;
font-size:12px
`

const ScriptDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Title = styled.div`

`

const DetailScript = styled.div`
`

const TagDiv = styled.div`
`
const Tags = styled.div`
`

const ViewConut = styled.div`

`