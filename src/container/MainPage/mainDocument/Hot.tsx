import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { useEffect, useState } from 'react';
import { getSport } from '../../../api/fetchSport';

interface Sport{
    id:number,
    name:string,
}

const Hot = () => {

    const sportImages: Record<number, string> = {
        1: '/images/football.png',
        2: '/images/swimming.png',
        3: '/images/baseball.png',
        4: '/images/running.png',
        5: '/images/badminton.png'
    };

    const [sports,setSports] = useState<Sport[]>([])

    useEffect(() => {
        const fetchSport = async () => {
            try {
                const response = await getSport()
                console.log(response)
                setSports(response);
            } catch (error) {
                alert('운동을 못 불러왔어요')
            }
        }
        fetchSport();
    },[]);

    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();

    return (
        <HotWrapper>
            <SectionTitle><strong>현재 HOT한 운동</strong></SectionTitle>
            <HotIconsDiv 
                ref={DivRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {sports.map((sport) => (
                    <ExIcon 
                        key={sport.id} 
                        src={sportImages[sport.id] || ''} 
                        alt={sport.name}
                    />
                ))}
            </HotIconsDiv>
        </HotWrapper>
    );
};

export default Hot;

const HotWrapper = styled.div`
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