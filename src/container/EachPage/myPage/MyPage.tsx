import { useEffect, useState } from "react";
import { fetchMyPage } from "../../../api/fetchMyPage";
import styled from "styled-components";
import { removeToken } from "../../../util/storage";
import { useNavigate } from "react-router-dom";

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
  profileUrl: string;
  gender: string;
  nickName: string;
  email: string;
}

const MyPage = () => {
    
    const navigate = useNavigate();
    const [myPageInfo, setMyPageInfo] = useState<mypage>({
        id: "",
        profileUrl: "",
        gender: "",
        nickName: "",
        email: "",
    });

  const handleLogout = () => {
    removeToken();
    alert("로그아웃");
  };

  //   useEffect(() => {
  //     const getMyPage = async () => {
  //         try {
  //             const response = await fetchMyPage();
  //             setMyPageInfo(response);
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  //     getMyPage();
  //   }, []);

  return (
    <Wrapper>
      {/* <div>{myPageInfo.nickName}</div> */}
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

const LogoutBtn = styled.button``;
