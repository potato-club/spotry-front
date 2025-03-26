import React, { useState } from "react";
import styled from "styled-components";
import { writePost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

interface PostInter {
  title: string,
  content: string,
  postState: string,
  sport: string,
  tag: string[],
  images: string[]
}

const WritePost: React.FC = () => {

  const navigate = useNavigate()

  const handleFinish = () => {
    navigate('/main');
  }

  const [postData, setPostData] = useState<PostInter>({
    title: "",
    content: "",
    postState: "",
    sport: "축구",
    tag: [""],
    images: [],
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState("ING");
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("postState", state);
      formData.append("sport", "축구");
      postData.tag.forEach(tag => {
        formData.append("tag", tag);
      });
      postData.images.forEach(image => {
        formData.append("images", image);
      });
      
      const response = await writePost(formData);
      if(response.status === 200){
        handleFinish();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PostCreationContainer isBlurred={isCategoryDropdownOpen}>
        <Header>
          <Button onClick={() => window.history.back()}>X</Button>
          <Button onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}>
            {state}
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
              setState("ING");
              setCategoryDropdownOpen(false);
            }}
          >
            모집중
          </div>
          <div
            onClick={() => {
              setState("ABOUT");
              setCategoryDropdownOpen(false);
            }}
          >
            모집임박
          </div>
          <div
            onClick={() => {
              setState("END");
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