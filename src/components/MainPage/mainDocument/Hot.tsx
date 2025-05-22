import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { useEffect, useState, useMemo } from 'react';
import { getSports, getSportDetail } from '../../../api/sportApi';
import { Sport } from '../../../types/Sport';

const Hot = () => {
    const [sports, setSports] = useState<Sport[]>([]);
    const [detailSports, setDetailSports] = useState<Sport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 스포츠 이미지 매핑 (메모이제이션)
    const sportImages: Record<string, string> = useMemo(() => ({
        '축구': '/images/football.png',
        '수영': '/images/swimming.png',
        '야구': '/images/baseball.png',
        '러닝': '/images/running.png',
        '배드민턴': '/images/badminton.png',
        '농구': '/images/baseball.png'
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const sportsResponse = await getSports();
                setSports(sportsResponse);
                
                if (sportsResponse.length > 0) {
                    const detailResponse = await getSportDetail(sportsResponse[0].id);
                    setDetailSports(detailResponse);
                }
            } catch (error) {
                console.error("스포츠 데이터를 가져오는데 실패했습니다:", error);
                setError("스포츠 정보를 불러올 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const {DivRef, handleMouseDown, handleMouseUp, handleMouseMove} = useDargX();

    // 로딩 상태 처리
    if (loading) {
        return (
            <HotWrapper>
                <SectionTitle><strong>현재 HOT한 운동</strong></SectionTitle>
                <LoadingContainer>로딩 중...</LoadingContainer>
            </HotWrapper>
        );
    }

    // 에러 상태 처리
    if (error) {
        return (
            <HotWrapper>
                <SectionTitle><strong>현재 HOT한 운동</strong></SectionTitle>
                <ErrorContainer>{error}</ErrorContainer>
            </HotWrapper>
        );
    }

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
                {detailSports.map((sport: Sport) => (
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
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const SectionTitle = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.md};
  margin-top: 0;
`;

const HotIconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  cursor: grab;
  padding: ${({ theme }) => theme.sizes.spacing.sm} 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const ExIcon = styled.img`
  width: ${({ theme }) => theme.sizes.component.icon.medium.width};
  height: ${({ theme }) => theme.sizes.component.icon.medium.height};
  margin-right: ${({ theme }) => theme.sizes.spacing.sm};
  cursor: pointer;
  user-select: none;
  pointer-events: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.sizes.component.icon.medium.height};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.sizes.component.icon.medium.height};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
