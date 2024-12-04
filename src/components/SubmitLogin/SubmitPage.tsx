import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { checkEmail, checkId, submitSignup } from "../../api/submitApi";

const SubmitMain: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthDate: "",
    email: "",
    emailDomain: "",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    gender: "",
    birthDate: "",
    email: "",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "name" && value) newErrors.name = "";
      if (name === "gender" && value) newErrors.gender = "";
      if (name === "birthDate" && value.match(/^\d{8}$/))
        newErrors.birthDate = "";
      if (name === "email" && value && form.emailDomain) newErrors.email = "";
      if (name === "emailDomain" && value && form.email) newErrors.email = "";
      if (name === "id" && value) newErrors.id = "";
      if (name === "password" && value.length >= 8 && value.length <= 16)
        newErrors.password = "";
      if (name === "confirmPassword" && value && value === form.password)
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
    if (form.id.length >= 5 && form.id.length <= 20) {
      try {
        const idExists = await checkId(form.id);
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

    if (!form.name) newErrors.name = "이름은 필수 정보입니다.";
    if (!form.gender) newErrors.gender = "성별을 선택하세요.";
    if (!form.birthDate.match(/^\d{8}$/))
      newErrors.birthDate = "생년월일은 8자리숫자로 입력해주세요.";
    if (!form.email || !form.emailDomain)
      newErrors.email = "이메일을 입력하세요.";
    if (!form.id) newErrors.id = "아이디를 입력하세요.";
    if (form.password.length < 8 || form.password.length > 16)
      newErrors.password =
        "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용하세요.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        console.log("Submit form:", form);
        await submitSignup(form);
        alert("회원가입 성공!");
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton>x</CloseButton>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        <InputField error={!!errors.name}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="이름"
          />
          {errors.name && <SmallText>{errors.name}</SmallText>}
        </InputField>

        <InputField>
          <label>성별</label>
          <GenderWrapper>
            <GenderButton
              selected={form.gender === "male"}
              onClick={() => setForm({ ...form, gender: "male" })}
            >
              남자
            </GenderButton>
            <GenderButton
              selected={form.gender === "female"}
              onClick={() => setForm({ ...form, gender: "female" })}
            >
              여자
            </GenderButton>
          </GenderWrapper>
          {errors.gender && <SmallText>{errors.gender}</SmallText>}
        </InputField>

        <InputField error={!!errors.birthDate}>
          <label htmlFor="birthDate">생년월일</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            value={form.birthDate}
            onChange={handleInputChange}
            placeholder="생년월일 8자리"
          />
          {errors.birthDate && <SmallText>{errors.birthDate}</SmallText>}
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
            >
              <option value="">선택</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
            </EmailSelect>
          </div>
          {emailCheckMessage && (
            <SmallText success={emailCheckMessage.includes("가능")}>
              {emailCheckMessage}
            </SmallText>
          )}
        </InputField>

        <InputField error={!!errors.id} name="id">
          <label htmlFor="id">아이디</label>
          <div>
            <input
              type="text"
              id="id"
              name="id"
              value={form.id}
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

        <InputField error={!!errors.password}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="비밀번호"
          />
          {errors.password ? (
            <SmallText>{errors.password}</SmallText>
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
      </FormContainer>

      <SubmitBtn>가입하기</SubmitBtn>
    </Wrapper>
  );
};

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #333333;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #333333;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  margin: 0;
  text-align: center;
  flex: 1;
`;

const FormContainer = styled.form`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const InputField = styled.div<{
  error?: boolean;
  name?: string;
}>`
  margin-bottom: 24px;

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 8px;
    color: #b1b1b1;
  }

  div {
    display: flex;
    align-items: center;
  }

  input {
    width: ${(props) =>
      props.name === "email"
        ? "155px"
        : props.name === "id"
        ? "250px"
        : "343px"};
    font-size: 14px;
    color: #fff;
    background: #444444;
    border: 1px solid ${(props) => (props.error ? "#FF6666" : "#555")};
    border-radius: 12px;
    height: 44px;
  }
`;

const At = styled.div`
  color: #8d8d8d;
  margin: 0px 8px 0px 8px;
`;

const GenderWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const GenderButton = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  color: ${(props) => (props.selected ? "#C1F84D" : "#b1b1b1")};
  background: transparent;
  border: 1px solid ${(props) => (props.selected ? "#C1F84D" : "#555")};
  border-radius: 12px;
  width: 165.5px;
  height: 44px;
`;

const EmailSelect = styled.select`
  width: 157px;

  padding: 0px;
  font-size: 14px;
  background: #444444;
  color: #8d8d8d;
  border: 1px solid #555;
  border-radius: 12px;
  height: 44px;
`;

const CheckButton = styled.button`
  background-color: #5d5d5d;
  color: #a7a7a7;
  font-size: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  height: 44px;
  width: 83px;
  padding: 0px;
  margin-left: 8px;
`;

const SmallText = styled.small<{ success?: boolean }>`
  color: ${(props) => (props.success ? "#C1F84D" : "#FF6666")};
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

const SubmitBtn = styled.button`
  cursor: pointer;
  padding: 12px;
  background-color: #c1f84d;
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: bold;
  position: sticky;
  bottom: 0;
  width: 343px;
  height: 44px;
  margin: auto;
  padding: 0px;
`;

export default SubmitMain;
