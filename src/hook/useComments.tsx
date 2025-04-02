// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Comment } from "../types/Post";

// const useComments = () => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get("https://your-backend-api.com/comments");
//       setComments(response.data);
//     } catch (error) {
//       console.error("댓글을 가져오는 데 오류가 발생했습니다.", error);
//     }
//   };

//   const addComment = async () => {
//     if (inputValue.trim()) {
//       const newComment: Comment = {
//         id: Date.now(),
//         user: {
//           name: "사용자",
//           profileImage: "/default.png",
//           location: "남현동",
//         },
//         text: inputValue,
//         createdAt: new Date(),
//         likes: 0,
//       };

//       try {
//         await axios.post("https://your-backend-api.com/comments", newComment);
//         fetchComments();
//         setInputValue("");
//       } catch (error) {
//         console.error("댓글을 추가하는 데 오류가 발생했습니다.", error);
//       }
//     }
//   };

//   const likeComment = async (id: number) => {
//     try {
//       const updatedComments = comments.map((comment) =>
//         comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
//       );
//       setComments(updatedComments);

//       await axios.put(`https://your-backend-api.com/comments/${id}`, {
//         likes: updatedComments.find((comment) => comment.id === id)?.likes,
//       });
//     } catch (error) {
//       console.error("좋아요를 처리하는 데 오류가 발생했습니다.", error);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   return {
//     comments,
//     inputValue,
//     setInputValue,
//     addComment,
//     likeComment,
//   };
// };

// export default useComments;

import { useState, useEffect } from "react";
import { Comment } from "../types/Post";

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");

  // 댓글을 추가하는 함수
  const addComment = () => {
    if (inputValue.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        user: {
          name: "사용자",
          profileImage: "/default.png",
          location: "남현동",
        },
        text: inputValue,
        createdAt: new Date(),
        likes: 0,
      };

      // 새로운 댓글을 로컬 상태에 추가
      setComments([newComment, ...comments]);

      // 댓글 입력 필드를 비움
      setInputValue("");
    }
  };

  // 댓글 좋아요를 처리하는 함수
  const likeComment = (id: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

  useEffect(() => {
    //더미데이터
    const initialComments: Comment[] = [
      {
        id: 1,
        user: {
          name: "사용자1",
          profileImage: "/default.png",
          location: "서울",
        },
        text: "두 번째 댓글입니다.",
        createdAt: new Date(),
        likes: 0,
      },
      {
        id: 2,
        user: {
          name: "사용자2",
          profileImage: "/default.png",
          location: "부산",
        },
        text: "첫 번째 댓글입니다.",
        createdAt: new Date(),
        likes: 0,
      },
    ];
    setComments(initialComments);
  }, []);

  return {
    comments,
    inputValue,
    setInputValue,
    addComment,
    likeComment,
  };
};

export default useComments;
