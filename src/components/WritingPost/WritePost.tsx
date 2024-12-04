import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PostCreationContainer = styled.div<{ isBlurred: boolean }>`
  background-color: ${(props) =>
    props.isBlurred ? "rgba(0, 0, 0, 0.2)" : "#333333"};
  color: #ffffff;
  height: 100vh;
  padding: 16px;
  filter: ${(props) => (props.isBlurred ? "blur(1px)" : "none")};
  transition: filter 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

const CategoryDropdown = styled.div`
  position: fixed;
  bottom: 0;
  width: 343px;
  height: 200px;
  background-color: #333333;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 16px;
  z-index: 100;

  div {
    padding: 16px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #444444;
    }
  }
`;

const Input = styled.input`
  display: flex;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #444444;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  display: flex;
  resize: none;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #444444;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  height: 150px;
`;

const WritePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("모집중");
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const postData = {
        title,
        content,
        category,
      };
      await axios.post("/api/posts", postData);
      alert("게시물이 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("게시물 업로드에 실패했습니다.", error);
    }
  };

  return (
    <>
      <PostCreationContainer isBlurred={isCategoryDropdownOpen}>
        <Header>
          <Button onClick={() => window.history.back()}>X</Button>
          <Button
            onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            {category}
          </Button>
          <Button onClick={handleSubmit}>완료</Button>
        </Header>

        <Input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="본문에 #을 활용해 태그를 작성해보세요! (최대 5개)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </PostCreationContainer>
      {isCategoryDropdownOpen && (
        <CategoryDropdown>
          <div
            onClick={() => {
              setCategory("모집중");
              setCategoryDropdownOpen(false);
            }}
          >
            모집중
          </div>
          <div
            onClick={() => {
              setCategory("모집임박");
              setCategoryDropdownOpen(false);
            }}
          >
            모집임박
          </div>
          <div
            onClick={() => {
              setCategory("모집완료");
              setCategoryDropdownOpen(false);
            }}
          >
            모집완료
          </div>
        </CategoryDropdown>
      )}
    </>
  );
};

export default WritePost;
