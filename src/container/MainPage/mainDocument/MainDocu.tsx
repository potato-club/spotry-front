import React from 'react';
import Hot from './Hot';
import Popular from './Popular';
import UpComing from './UpComing';
import WriteButton from '../../../components/WritingPost/WriteButton';

const MainDocu = () => {
    return (
        <>
            <Hot/>
            <Popular/>
            <UpComing/>
            <WriteButton/>
        </>
    );
};

export default MainDocu;