import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { useEffect, useState } from 'react';
import { getSport } from '../../../api/fetchSport';

interface Sport{
    id:number,
    name:string,
}

const Hot = () => {

    const [sports,setSports] = useState<Sport[]>([])

    useEffect(() => {
        const fetchSport = async () => {
            try {
                const response = await getSport()
                return response.data;
            } catch (error) {
                alert('운동을 못 불러왔어요')
            }
        }
        fetchSport();
    },[]);

    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();

    return (
        <HotWrpaaer>
            <SectionTitle><strong>현재 HOT한 운동</strong></SectionTitle>
            <HotIconsDiv 
            ref={DivRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}>
                <ExIcon src='/images/football.png' alt='축구'/>
                <ExIcon src='/images/running.png' alt='런닝'/>
                <ExIcon src='/images/baseball.png' alt='야구'/>
                <ExIcon src='/images/badminton.png' alt='배드민턴'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
            </HotIconsDiv>
        </HotWrpaaer>
    );
};

export default Hot;

const HotWrpaaer = styled.div`
    width: 90%;
    overflow: hidden;
`

const SectionTitle = styled.p`
    color: white;
`

const HotIconsDiv = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    cursor: grab;
    &::-webkit-scrollbar{
        display:none;
    }
`

const ExIcon = styled.img`
    width: 56px;
    height: 78px;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
    pointer-events: none;
`