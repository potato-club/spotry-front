import styled from "styled-components";

export const Container = styled.div`
  width: ${({ theme }) => theme.sizes.container.mobile};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  min-height: 100vh;
  padding: 0;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: 0.5rem 0 0.25rem;
`;

export const Input = styled.input`
  width: ${({ theme }) => theme.sizes.component.input.large.width};
  height: ${({ theme }) => theme.sizes.component.input.large.height};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  border: none;
  margin-bottom: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0 ${({ theme }) => theme.sizes.spacing.md};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.interactive.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

export const EmailInput = styled.input`
  width: ${({ theme }) => theme.sizes.component.input.small.width};
  padding: 0 ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.quaternary};
  border: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  height: ${({ theme }) => theme.sizes.component.input.small.height};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.interactive.focus};
  }
`;

export const ResultText = styled.p`
  color: ${({ theme }) => theme.colors.status.success};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-top: 1rem;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: 1rem;
`;

export const NormalText = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const SelectSection = styled.div`
  width: 373px;
  height: 40px;
  color: ${({ theme }) => theme.colors.text.quaternary};
`;
