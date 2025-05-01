import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2b2b2b;
  min-height: 100vh;
  padding: 1rem;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
`;

export const Label = styled.label`
  color: #ffffff;
  margin: 0.5rem 0 0.25rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  margin-bottom: 0.75rem;
  font-size: 1rem;
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
  color: #8d8d8d;
`;
