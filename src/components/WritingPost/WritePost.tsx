import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { writePost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import { getSport, getDetailSport } from "../../api/fetchSport";

interface PostInter {
  title: string,
  content: string,
  postState: string,
  sport: string,
  tag: string[],
  images: string[]
}

const WritePost: React.FC = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/main");
  };

  const [sports, setSports] = useState<{ id: number; name: string }[]>([]);
  const [detailSports, setDetailSports] = useState<{ id: number; name: string }[]>([]);
  const [postData, setPostData] = useState<PostInter>({
    title: "",
    content: "",
    postState: "",
    sport: "", 
    tag: [""],
    images: [],
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState("ING");
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await getSport();
        setSports(response);
        if (response.length > 0) {
          fetchDetailSport(response[0].id);
        }
      } catch (error) {
        console.error("스포츠 목록을 가져오지 못했습니다.", error);
      }
    };
    fetchSports();
  }, []);

  const fetchDetailSport = async (id: number) => {
    try {
      const response = await getDetailSport(id);
      setDetailSports(response);
  
      if (response.length > 0) {
        setPostData((prev) => ({ ...prev, sport: response[0].name }));
      }
    } catch (error) {
      console.error("세부 스포츠 정보를 가져오지 못했습니다.", error);
    }
  };
  
  useEffect(() => {
    if (detailSports.length > 0) {
      setPostData((prev) => ({ ...prev, sport: detailSports[0].name }));
    }
  }, [detailSports]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("postState", state);
      formData.append("sport", postData.sport); 
      postData.tag.forEach((tag) => {
        formData.append("tag", tag);
      });
      postData.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await writePost(formData);
      if (response.status === 200) {
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

        <Input type="text" placeholder="제목을 입력해주세요." value={title} onChange={(e) => {
          setTitle(e.target.value)}} />
        <TextArea placeholder="본문에 #을 활용해 태그를 작성해보세요! (최대 5개)" value={content} onChange={(e) => setContent(e.target.value)} />

        <Select onChange={(e) => {
          setPostData({ ...postData, sport: e.target.value })
          }} value={postData.sport}>
          {detailSports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </Select>
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

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-top: ${({ theme }) => theme.sizes.spacing.sm};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.interactive.focus};
  }

  option {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const PostCreationContainer = styled.div<{ isBlurred: boolean }>`
  background-color: ${({ isBlurred, theme }) =>
    isBlurred ? theme.colors.utility.overlay : theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  height: 100vh;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  filter: ${({ isBlurred }) => (isBlurred ? "blur(1px)" : "none")};
  transition: filter 0.3s ease;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  padding: ${({ theme }) => theme.sizes.spacing.sm};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactive.hover};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CategoryDropdown = styled.div`
  position: fixed;
  bottom: 0;
  width: ${({ theme }) => theme.sizes.component.button.large.width};
  height: 200px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.xlarge};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.xlarge};
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  z-index: ${({ theme }) => theme.sizes.zIndex.dropdown};
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 -4px 12px ${({ theme }) => theme.colors.utility.shadow};

  div {
    padding: ${({ theme }) => theme.sizes.spacing.lg};
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Input = styled.input`
  display: flex;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background-color: ${({ theme }) => theme.colors.utility.transparent};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.interactive.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const TextArea = styled.textarea`
  display: flex;
  resize: none;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background-color: ${({ theme }) => theme.colors.utility.transparent};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  height: ${({ theme }) => theme.sizes.component.input.textarea.height};
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.interactive.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;