import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface EmailSelectProps {
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const EmailSelect: React.FC<EmailSelectProps> = ({ value, onChange }) => {
  return (
    <Select name="emailDomain" value={value} onChange={onChange}>
      <option value="">선택</option>
      <option value="naver.com">naver.com</option>
      <option value="gmail.com">gmail.com</option>
      <option value="hanmail.net">hanmail.net</option>
    </Select>
  );
};

const Select = styled.select`
  width: 157px;
  padding: 0px;
  font-size: 14px;
  background: #444444;
  color: #8d8d8d;
  border: 1px solid #555;
  border-radius: 12px;
  height: 44px;
`;

export default EmailSelect;
