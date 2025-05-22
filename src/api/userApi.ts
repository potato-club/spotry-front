import { getToken } from "../util/storage";
import url from "./url";

export const getUserProfile = async () => {
    try {
        const response = await url.get('/mypage', {
            headers: {
                'Authorization': getToken()
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findUserId = async (nickName: string, userEmail: string) => {
    try {
        console.log("아이디 찾기 요청:", { nickName, userEmail });
        const response = await url.post("/auth/id/retrieve", {
            nickName,
            userEmail,
        });
        console.log("아이디 찾기 응답:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("아이디 찾기 오류:", error.response);
        throw error.response?.data?.message || "아이디 찾기 실패";
    }
};

export const verifyUserInfo = (
    userId: string,
    nickName: string,
    userEmail: string
) =>
    url.post("/auth/password/verify", {
        userId,
        nickName,
        userEmail,
    });


export const sendVerificationEmail = (email: string) =>
    url.post("/auth/register/send-email", { email });


export const verifyEmailCode = (email: string, code: string) =>
    url.post("/auth/register/verify-code", { email, code });


export const resetPassword = (id: number, newPassword: string) => {
    return url.post("/auth/password/reset", {
        id,
        newPassword,
    });
};