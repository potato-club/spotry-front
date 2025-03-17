import React, { useEffect } from 'react';
import EachPage from '../EachPage';
import { useState } from 'react';
import { getMainPost } from '../../../api/postApi';

interface mainPost{
    id: 0,
    title: "string",
    sport: "string",
    likeCount: 0
}

const PostPage = () => {
    
    const [resultPost,setResultPost] = useState<mainPost[]>([]);

    useEffect(()=> {
        const fetchMain = async () => {
            try {
                const response = await getMainPost();
                console.log(response);
                setResultPost(response)
            } catch (error) {
                alert('mainPost 불러오기 실패');
            }
        }
        fetchMain()
    },[]);

    return (
            <EachPage resultPost={resultPost}/>
    );
};

export default PostPage;