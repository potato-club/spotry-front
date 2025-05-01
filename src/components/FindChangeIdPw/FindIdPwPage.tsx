import React from "react";
import useSelectedArea from "../../hook/useSelectedArea";
import IdPwHeader from "./IdPwHeader";
import TabButtons from "./SelectBtn";
import FindID from "./FindID";
import VerifyUser from "./VerfyUser";

const FindIdPwPage: React.FC = () => {
  const { selected, toggleSelect } = useSelectedArea<string>("id");

  return (
    <>
      <IdPwHeader title={selected === "id" ? "아이디 찾기" : "비밀번호 변경"} />
      <TabButtons selected={selected} onSelect={toggleSelect} />
      {selected === "id" ? <FindID /> : <VerifyUser />}
    </>
  );
};

export default FindIdPwPage;
