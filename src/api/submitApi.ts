import { setToken } from "../util/storage";
import url from "./url";

export interface SignupForm {
  userName: string;
  nickName: string;
  gender: string;
  email: string;
  birthDay: string;
  userId: string;
  userPw: string;
}

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await url.post("/check-email", { email });
    return response.data.exists;
  } catch (error) {
    throw new Error("이메일 확인 중 오류가 발생했습니다.");
  }
};

export const checkId = async (id: string): Promise<boolean> => {
  try {
    const response = await url.post("/check-id", { id });
    return response.data.exists;
  } catch (error) {
    throw new Error("아이디 확인 중 오류가 발생했습니다.");
  }
};

export const submitSignup = async (formData: SignupForm): Promise<void> => {
  console.log("회원가입 요청 데이터:", formData);
  try {
    const response = await url.post("/auth/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    alert("회원가입 성공!");
    
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

export const SubmitLogin = async (loginData: { userId: string; userPw: string }) => {
  try {
    const response = await url.post("/auth/login", loginData);

    if (response.status === 200) {
      const token = response.headers.authorization
      console.log("받은 토큰:", token);
      if (token) {
        setToken(token);  
        console.log("로그인 성공! 토큰을 확인했습니다. "+ token);
      } else {
        console.log("로그인 성공! 그러나 토큰을 찾을 수 없습니다.");
      }
    }
    return response.data;
  } catch (error) {
    console.log("로그인 실패");
    console.error("로그인 중 오류:", error);
  }
};


// console.log('모든 응답 헤더:', response.headers);
      
// console.log('Authorization 헤더:', response.headers.authorization);
// console.log('Authorization 헤더 (대문자):', response.headers.Authorization);
// console.log('Set-Cookie 헤더:', response.headers['set-cookie']);

// 'Authorization': `Bearer ${localStorage.getItem("token")}`

// export const SubmitLogin = async (loginData: { userId: string; userPw: string }) => {
//   try {
//     const response = await url.post("/auth/login", loginData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status === 200) {
//       console.log('200 응답');
//       const token = response.data.accessToken;
//       console.log("받은 토큰:", token);

//       if (token) {
//         localStorage.setItem("accessToken", token);
//         url.defaults.headers.common["Authorization"] = `Bearer ${token}`; // axios 인스턴스에 토큰 설정
//         alert("로그인 성공! 토큰이 저장되었습니다.");
//       } else {
//         alert("로그인 성공! 그러나 토큰을 찾을 수 없습니다.");
//       }
//     }
//     return response.data;
//   } catch (error) {
//     alert("로그인 실패");
//     console.error("로그인 중 오류:", error);
//   }
// };



// export const SubmitLogin = async (loginData: {userId: string, userPw: string}) => {
//   try {
//     const response = await url.post("/auth/login", loginData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // 응답 헤더에서 토큰 확인
//     const token = response.headers['authorization'];
//     console.log("Received Token from Headers:", token);

//     if (token) {
//       // 로컬스토리지에 저장
//       localStorage.setItem("accessToken", token);
//       alert("로그인 성공! 토큰이 저장되었습니다.");
//     } else {
//       alert("로그인 성공! 그러나 토큰을 찾을 수 없습니다.");
//     }

//     return response.data;
//   } catch (error) {
//     alert("로그인 실패");
//     console.error(error);
//   }
// };