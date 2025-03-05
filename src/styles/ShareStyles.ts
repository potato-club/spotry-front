import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212; /* 어두운 배경 */
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

export const Button = styled.button`
  background-color: #b0ff5e;
  color: #000000;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #9af542;
  }
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
