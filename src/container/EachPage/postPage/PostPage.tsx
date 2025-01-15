import React from 'react';
import EachPage from '../EachPage';
import PopularData from '../../../tableData/PopularData.json';
import { useState } from 'react';

const PostPage = () => {
    
    const [resultPost,setResultPost] = useState(PopularData);

    return (
            <EachPage resultPost={resultPost}/>
    );
};

export default PostPage;