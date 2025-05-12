import React from "react";
import useSelectedArea from "../../hook/useSelectedArea";
import IdPwHeader from "./IdPwHeader";
import TabButtons from "./SelectBtn";
import FindID from "./FindID";
import VerifyUser from "./VerfyUser";
import styled from "styled-components";

const FindIdPwPage: React.FC = () => {
  const { selected, toggleSelect } = useSelectedArea<string>("id");

  return (
    <HeaderWrapper>
      <IdPwHeader
        title={selected === "id" ? "아이디 찾기 " : "비밀번호 찾기"}
      />
      <TabButtons selected={selected} onSelect={toggleSelect} />
      {selected === "id" ? <FindID /> : <VerifyUser />}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  height: 100px;
  width: 100%;
`;

export default FindIdPwPage;
