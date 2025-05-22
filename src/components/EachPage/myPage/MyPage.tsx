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
 
import { UserProfile } from "../../../types/User";

const MyPage = () => {
    
    const [myPageInfo, setMyPageInfo] = useState<UserProfile>({
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
  margin-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.xxxl};
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  box-sizing: border-box;
`;

const LogoutBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: ${({ theme }) => theme.sizes.spacing.md} ${({ theme }) => theme.sizes.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.sizes.spacing.xl};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.status.warning};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  margin-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.xxxl};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.xxlarge};
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: ${({ theme }) => theme.sizes.spacing.xl};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.utility.shadow};
`;

const ProfileImg = styled.img`
  width: ${({ theme }) => theme.sizes.component.icon.profile.width};
  height: ${({ theme }) => theme.sizes.component.icon.profile.height};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.round};
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
  border: 3px solid ${({ theme }) => theme.colors.primary.main};
`;

const NickName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.utility.black};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
`;

const Email = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
`;

const Gender = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
`;

const Birthday = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

