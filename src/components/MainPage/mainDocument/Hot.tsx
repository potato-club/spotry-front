import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { useEffect, useState } from 'react';
import { getSports, getSportDetail } from '../../../api/sportApi';

const Hot = () => {

    const [sports, setSports] = useState<{ id: number; name: string }[]>([]);
    const [detailSports, setDetailSports] = useState<{ id: number; name: string }[]>([]);

    const sportImages: Record<string, string> = {
        '축구': '/images/football.png',
        '수영': '/images/swimming.png',
        '야구': '/images/baseball.png',
        '러닝': '/images/running.png',
        '배드민턴': '/images/badminton.png',
        '농구': '/images/baseball.png'
    };

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await getSports();
                setSports(response);
                if (response.length > 0) {
                    fetchDetailSport(response[0].id); 
                }
            } catch (error) {
                console.error("스포츠 목록을 가져오지 못했습니다.", error);
            }
        };
        fetchSports();
    }, []);

    const fetchDetailSport = async (id: number) => {
        try {
            const response = await getSportDetail(id);
            setDetailSports(response); 
        } catch (error) {
            console.error("세부 스포츠 정보를 가져오지 못했습니다.", error);
        }
    };

    const {DivRef, handleMouseDown, handleMouseUp, handleMouseMove} = useDargX();

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
                {detailSports.map((sport) => (
                    <ExIcon 
                        key={sport.id} 
                        src={sportImages[sport.name] || '/images/default.png'} 
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
`;

const SectionTitle = styled.p`
    color: white;
`;

const HotIconsDiv = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    cursor: grab;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ExIcon = styled.img`
    width: 56px;
    height: 78px;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
    pointer-events: none;
`;
