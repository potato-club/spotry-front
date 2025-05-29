import React, { useEffect } from 'react';
import EachPage from '../EachPage';
import { useState } from 'react';
import { getMainPost } from '../../../api/postApi';

import { MainPost } from '../../../types/Post';

const PostPage = () => {
    
    const [resultPost,setResultPost] = useState<MainPost[]>([]);

    useEffect(()=> {
        const fetchMain = async () => {
            try {
                const response = await getMainPost();
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