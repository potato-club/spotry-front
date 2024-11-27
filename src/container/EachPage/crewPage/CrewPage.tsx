import EachPage from '../EachPage';
import { SportData } from '../../../tableData/SportData';
import { useState } from 'react';

const CrewPage = () => {

    const [resultPost,setResultPost] = useState(SportData);

    return (
        <EachPage resultPost={resultPost}/>
    );
};

export default CrewPage;