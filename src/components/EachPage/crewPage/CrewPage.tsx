import EachPage from '../EachPage';
import { useEffect, useState } from 'react';
import { getCrewPost } from '../../../api/postApi';

import { CrewPost } from '../../../types/Post';

const CrewPage = () => {

    const [resultPost,setResultPost] = useState<CrewPost[]>([]);

    useEffect(() => {
        const fetchCrewPage = async () => {
            try {
                const response = await getCrewPost();
                // console.log("crew 페이지 배열 확인 :",response);
                setResultPost(response);
            } catch (error) {
                alert('fetch 실패')
                console.log(error)
            }
        }
        fetchCrewPage();
    },[])

    return (
        <EachPage resultPost={resultPost}/>
    );
};

export default CrewPage;