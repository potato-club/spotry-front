import url from "./url";

export const findUserID = async (nickName: string, userEmail: string) => {
  try {
    console.log("아이디 찾기 요청:", { nickName, userEmail });
    const response = await url.post("/auth/id/retrieve", {
      nickName,
      userEmail,
    });
    console.log("아이다찾기 응답:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("아이디 찾기 오류:", error.response);
    throw error.response?.data?.message || "아이디 찾기 실패";
  }
};
