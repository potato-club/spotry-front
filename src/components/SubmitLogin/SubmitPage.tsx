import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { checkEmail, checkUserId, registerUser } from "../../api/authApi";
import { SignupFormData } from "../../types/User";
import { useNavigate } from "react-router-dom";
import EmailSelect from "../Login/EmailSelect";

const SubmitMain: React.FC = () => {
  const navigate = useNavigate();

  const toPrev = () => {
    navigate(-1);
  };

  const [form, setForm] = useState({
    userName: "",
    gender: "" as "MALE" | "FEMALE" | "",
    nickName: "",
    email: "",
    birthDay: "",
    birthDayForm: "",
    userId: "",
    userPw: "",
    emailDomain: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    nickName: "",
    gender: "",
    email: "",
    birthDay: "",
    userId: "",
    userPw: "",
    confirmPassword: "",
  });

  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "birthDay") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 8) return;
      setForm({ ...form, [name]: onlyNumbers });
      if (onlyNumbers.length === 8) {
        const formattedDate = onlyNumbers.replace(
          /^(\d{4})(\d{2})(\d{2})$/,
          "$1-$2-$3"
        );
        setForm({
          ...form,
          birthDayForm: formattedDate,
          birthDay: onlyNumbers,
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "name" && value) newErrors.userName = "";
      if (name === "gender" && value) newErrors.gender = "";
      if (name === "birthDate" && value.match(/^\d{8}$/))
        newErrors.birthDay = "";
      if (name === "email" && value && form.emailDomain) newErrors.email = "";
      if (name === "emailDomain" && value && form.email) newErrors.email = "";
      if (name === "id" && value) newErrors.userId = "";
      if (name === "password" && value.length >= 8 && value.length <= 16)
        newErrors.userPw = "";
      if (name === "confirmPassword" && value && value === form.userPw)
        newErrors.confirmPassword = "";
      return newErrors;
    });
  };

  const handleEmailCheck = async () => {
    if (form.email && form.emailDomain) {
      const fullEmail = `${form.email}@${form.emailDomain}`;
      try {
        const emailExists = await checkEmail(fullEmail);
        setEmailCheckMessage(
          emailExists
            ? "이미 사용 중인 이메일입니다."
            : "사용 가능한 이메일입니다."
        );
      } catch (error: any) {
        setEmailCheckMessage(error.message);
      }
    } else {
      setEmailCheckMessage("이메일을 정확히 입력하세요.");
    }
  };

  const handleIdCheck = async () => {
    if (form.userId.length >= 5 && form.userId.length <= 20) {
      try {
        const idExists = await checkUserId(form.userId);
        setIdCheckMessage(
          idExists
            ? "이미 사용 중인 아이디입니다."
            : "사용 가능한 아이디입니다."
        );
      } catch (error: any) {
        setIdCheckMessage(error.message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { ...errors };

    if (!form.userName) newErrors.userName = "이름은 필수 정보입니다.";
    if (!form.gender) newErrors.gender = "성별을 선택하세요.";
    if (!form.birthDay.match(/^\d{8}$/))
      newErrors.birthDay = "생년월일은 8자리숫자로 입력해주세요.";
    if (!form.email || !form.emailDomain)
      newErrors.email = "이메일을 입력하세요.";
    if (!form.userId) newErrors.userId = "아이디를 입력하세요.";
    if (form.userPw.length < 8 || form.userPw.length > 16)
      newErrors.userPw =
        "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.";
    if (form.userPw !== form.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        console.log("회원가입 요청 데이터:", form);
        const respose = await registerUser({
          userName: form.userName,
          nickName: form.nickName,
          gender: form.gender as "MALE" | "FEMALE",
          email: `${form.email}@${form.emailDomain}`,
          birthDay: form.birthDayForm,
          userId: form.userId,
          userPw: form.userPw,
        });
        navigate("/");
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={toPrev}>x</CloseButton>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        <InputField error={!!errors.userName}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={form.userName}
            onChange={handleInputChange}
            placeholder="이름"
          />
          {errors.userName && <SmallText>{errors.userName}</SmallText>}
        </InputField>

        <InputField error={!!errors.nickName}>
          <label htmlFor="nickName">닉네임</label>
          <input
            type="text"
            id="nickName"
            name="nickName"
            value={form.nickName}
            onChange={handleInputChange}
            placeholder="닉네임을 입력하세요"
          />
          {errors.nickName && <SmallText>{errors.nickName}</SmallText>}
        </InputField>

        <InputField>
          <label>성별</label>
          <GenderWrapper>
            <GenderButton
              selected={form.gender === "MALE"}
              onClick={() => setForm({ ...form, gender: "MALE" })}
            >
              남자
            </GenderButton>
            <GenderButton
              selected={form.gender === "FEMALE"}
              onClick={() => setForm({ ...form, gender: "FEMALE" })}
            >
              여자
            </GenderButton>
          </GenderWrapper>
          {/* {errors.gender && <SmallText>{errors.gender}</SmallText>} */}
        </InputField>

        <InputField error={!!errors.birthDay}>
          <label htmlFor="birthDay">생년월일</label>
          <input
            type="text"
            id="birthDay"
            name="birthDay"
            value={form.birthDay}
            onChange={handleInputChange}
            placeholder="생년월일 8자리"
            maxLength={8}
          />
          {errors.birthDay && <SmallText>{errors.birthDay}</SmallText>}
        </InputField>

        <InputField error={!!errors.email} name="email">
          <label htmlFor="email">이메일</label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="이메일"
            />
            <At>
              <div>@</div>
            </At>

            <EmailSelect
              name="emailDomain"
              value={form.emailDomain}
              onChange={handleInputChange}
            />
          </div>
          {emailCheckMessage && (
            <SmallText success={emailCheckMessage.includes("가능")}>
              {emailCheckMessage}
            </SmallText>
          )}
        </InputField>

        <InputField error={!!errors.userId} name="id">
          <label htmlFor="userId">아이디</label>
          <div>
            <input
              type="text"
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleInputChange}
              placeholder="아이디"
            />

            <CheckButton type="button" onClick={handleIdCheck}>
              중복확인
            </CheckButton>
          </div>
          {idCheckMessage && (
            <SmallText success={idCheckMessage.includes("가능")}>
              {idCheckMessage}
            </SmallText>
          )}
          <label htmlFor="id">
            5~20자의 영문 소문자, 숫자 사용 가능합니다.
          </label>
        </InputField>

        <InputField error={!!errors.userPw}>
          <label htmlFor="userPw">비밀번호</label>
          <input
            type="password"
            id="userPw"
            name="userPw"
            value={form.userPw}
            onChange={handleInputChange}
            placeholder="비밀번호"
          />
          {errors.userPw ? (
            <SmallText>{errors.userPw}</SmallText>
          ) : (
            <label htmlFor="password">
              8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
            </label>
          )}
        </InputField>

        <InputField error={!!errors.confirmPassword}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            placeholder="비밀번호 확인"
          />
          {errors.confirmPassword && (
            <SmallText>{errors.confirmPassword}</SmallText>
          )}
        </InputField>
        <SubmitBtn type="submit">가입하기</SubmitBtn>
      </FormContainer>
    </Wrapper>
  );
};

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.sizes.zIndex.header};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.sizes.spacing.sm};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactive.hover};
  }
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
  text-align: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormContainer = styled.form`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  overflow-y: auto;
`;

const InputField = styled.div<{
  error?: boolean;
  name?: string;
}>`
  margin-bottom: ${({ theme }) => theme.sizes.spacing.xl};

  label {
    display: block;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  div {
    display: flex;
    align-items: center;
  }

  input {
    width: ${(props) =>
      props.name === "email"
        ? props.theme.sizes.component.input.small.width
        : props.name === "id"
        ? props.theme.sizes.component.input.medium.width
        : props.theme.sizes.component.input.large.width};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.tertiary};
    border: 1px solid ${(props) => 
      props.error ? props.theme.colors.status.warning : props.theme.colors.background.quaternary};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
    height: ${({ theme }) => theme.sizes.component.input.large.height};
    padding: 0 ${({ theme }) => theme.sizes.spacing.md};
    box-sizing: border-box;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.interactive.focus};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.quaternary};
    }
  }
`;

const At = styled.div`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0 ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const GenderWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
`;

const GenderButton = styled.button.attrs({ type: "button" })<{
  selected?: boolean;
}>`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${(props) => 
    props.selected ? props.theme.colors.primary.main : props.theme.colors.text.tertiary};
  background: ${({ theme }) => theme.colors.utility.transparent};
  border: 1px solid ${(props) => 
    props.selected ? props.theme.colors.primary.main : props.theme.colors.background.quaternary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  width: ${({ theme }) => theme.sizes.component.button.medium.width};
  height: ${({ theme }) => theme.sizes.component.input.large.height};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const CheckButton = styled.button`
  background-color: ${({ theme }) => theme.colors.interactive.disabled};
  color: ${({ theme }) => theme.colors.text.disabled};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  cursor: pointer;
  height: ${({ theme }) => theme.sizes.component.input.large.height};
  width: ${({ theme }) => theme.sizes.component.button.small.width};
  padding: 0;
  margin-left: ${({ theme }) => theme.sizes.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.utility.black};
  }
`;

const SmallText = styled.small<{ success?: boolean }>`
  color: ${(props) => 
    props.success ? props.theme.colors.status.success : props.theme.colors.status.warning};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  display: block;
  margin-top: ${({ theme }) => theme.sizes.spacing.xs};
`;

const SubmitBtn = styled.button`
  cursor: pointer;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  color: ${({ theme }) => theme.colors.utility.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  position: sticky;
  bottom: 0;
  width: ${({ theme }) => theme.sizes.component.button.large.width};
  height: ${({ theme }) => theme.sizes.component.input.large.height};
  margin: auto;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SubmitMain;
