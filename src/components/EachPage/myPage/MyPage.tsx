import { useEffect, useState } from "react";
import { getUserProfile } from "../../../api/userApi";
import styled from "styled-components";
import { removeToken } from "../../../util/storage";

/*
    private final String id;
    private final String profileUrl;
    private final LocalDate birthday;
    private final Gender gender;
    private final String nickName;
    private final String email;
*/
 
interface mypage {
  id: string;
  birthday: string,
  profileUrl: string;
  gender: string;
  nickName: string;
  email: string;
}

const MyPage = () => {
    
    const [myPageInfo, setMyPageInfo] = useState<mypage>({
        id: "",
        birthday:"",
        profileUrl: "",
        gender: "",
        nickName: "",
        email: "",
    });

  const handleLogout = () => {
    removeToken();
    alert("로그아웃");
  };

    useEffect(() => {
      const getMyPage = async () => {
          try {
              const response = await getUserProfile();
              console.log(response)
              setMyPageInfo(response);
          } catch (error) {
              console.log(error);
          }
      }
      getMyPage();
    }, []);

  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileImg src={myPageInfo.profileUrl} alt="profile" />
        <NickName>{myPageInfo.nickName}</NickName>
        <Email>{myPageInfo.email}</Email>
        <Birthday>{myPageInfo.birthday}</Birthday>
        <Gender>{myPageInfo.gender}</Gender>
      </ProfileContainer>
      <LogoutBtn onClick={() => handleLogout()}>로그아웃</LogoutBtn>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
`;

const LogoutBtn = styled.button``
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 20px;
  background-color: #f0f0f0;
`
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
`
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const NickName = styled.div``
const Email = styled.div``
const Gender = styled.div``
const Birthday = styled.div``
const EditBtn = styled.button``

