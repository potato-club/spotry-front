import axios from "axios";

const BASE_URL = "https://sportry.site";

const url = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// , { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse }

// const getAccessToken = (): string | null => localStorage.getItem("accessToken");
// const setAccessToken = (token: string): void => {
//   console.log("✅ 저장된 토큰:", token); // 디버깅용
//   localStorage.setItem("accessToken", token);
// };

// url.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    
//     const token = getAccessToken();
//     if (!token) {
//       console.warn("[인터셉터] 토큰이 없습니다! (undefined)");
//     } else {
//       console.log("[인터셉터] 저장된 토큰:", token);
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// url.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         console.log("🔄 토큰 갱신 시도...");
//         const newToken = await refreshAccessToken();
//         setAccessToken(newToken);
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         return url(error.config);
//       } catch (refreshError) {
//         console.error("토큰 갱신 실패", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // 🔹 토큰 갱신 함수
// const refreshAccessToken = async (): Promise<string> => {
//   try {
//     const response = await axios.post<{ accessToken: string }>(
//       `${BASE_URL}/auth/refresh`,
//       { refreshToken: localStorage.getItem("refreshToken") }
//     );

//     console.log("🔄 새 토큰 수신:", response.data.accessToken);
//     return response.data.accessToken;
//   } catch (error) {
//     console.error("토큰 갱신 오류", error);
//     throw error;
//   }
// };

export default url;



// const beforReq = (config: any) => {
// }

// const refreshJwt = async (accessToken: any, refreshToken: any) => {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/api/member/refresh?refreshToken=${refreshToken}`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error("Failed to refresh token");
//   }
// };

