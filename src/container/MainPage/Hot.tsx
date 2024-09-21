import styled from 'styled-components';

const Hot = () => {
    return (
        <HotWrpaaer>
            <SectionTitle><strong>현재 HOT한 운동</strong></SectionTitle>
            <HotIconsDiv>
                <ExIcon src='/images/football.png' alt='축구'/>
                <ExIcon src='/images/running.png' alt='런닝'/>
                <ExIcon src='/images/baseball.png' alt='야구'/>
                <ExIcon src='/images/badminton.png' alt='배드민턴'/>
                <ExIcon src='/images/swimming.png' alt='수영'/>
            </HotIconsDiv>
        </HotWrpaaer>
    );
};

export default Hot;

const HotWrpaaer = styled.div`
    width: 90%;
`

const SectionTitle = styled.p`
    color: white;
`

const HotIconsDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ExIcon = styled.img`
    cursor: pointer;
`