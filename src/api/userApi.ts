import { getToken } from "../util/storage";
import url from "./url";

// ========================================
// 사용자 프로필 관련
// ========================================

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

// ========================================
// 아이디 찾기
// ========================================

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

// ========================================
// 비밀번호 재설정 관련
// ========================================

/**
 * 사용자 정보 확인 (비밀번호 재설정용)
 */
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

/**
 * 인증 코드 발송
 */
export const sendVerificationEmail = (email: string) =>
    url.post("/auth/register/send-email", { email });

/**
 * 인증 코드 검증
 */
export const verifyEmailCode = (email: string, code: string) =>
    url.post("/auth/register/verify-code", { email, code });

/**
 * 비밀번호 재설정
 */
export const resetPassword = (id: number, newPassword: string) => {
    return url.post("/auth/password/reset", {
        id,
        newPassword,
    });
};