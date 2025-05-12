import styled from "styled-components";

export const Container = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  min-height: 100vh;
  padding: none;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  color: #ffffff;
  margin: 0.5rem 0 0.25rem;
`;

export const Input = styled.input`
  width: 343px;
  height: 44px;
  border-radius: 12px;
  border: none;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  background-color: #444444;
`;

export const EmailInput = styled.input`
  width: 157px;
  padding: 0px;
  font-size: 14px;
  background: #444444;
  color: #8d8d8d;
  border: 1px solid #555;
  border-radius: 12px;
  height: 44px;
`;

export const ResultText = styled.p`
  color: #b0ff5e;
  font-size: 1rem;
  margin-top: 1rem;
`;

export const ErrorText = styled.p`
  color: #ff4040;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const NormalText = styled.p`
  color: white;
  font-size: 16px;
`;

export const SelectSection = styled.div`
  width: 373px;
  height: 40px;
  color: 8D8D8D;
`;
