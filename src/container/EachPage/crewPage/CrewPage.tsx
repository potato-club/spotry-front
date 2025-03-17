import EachPage from '../EachPage';
import { useEffect, useState } from 'react';
import { getCrewPost } from '../../../api/postApi';

interface crewInter{
    id: 0,
    region: "string",
    postDate: "string",
    title: "string",
    postState: "string",
    sport: "string",
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    tag: string[]
}

const CrewPage = () => {

    const [resultPost,setResultPost] = useState<crewInter[]>([]);

    useEffect(() => {
        const fetchCrewPage = async () => {
            try {
                const response = await getCrewPost();
                console.log("crew 페이지 배열 확인 :",response);
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