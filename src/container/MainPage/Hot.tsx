import styled from 'styled-components';
import useDargX from '../../hook/useDargX';

const Hot = () => {

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
`

const SectionTitle = styled.p`
    color: white;
`

const HotIconsDiv = styled.div`
    /* width: 100%; */
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