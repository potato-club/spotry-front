import styled from 'styled-components';
import { Region } from '../../../../types/Region';

interface ProcessProps{
    region:Region | null,
    city:Region | null,
    town:Region | null,
    addSelection: () => void;
}

const Process = ({region,city,town,addSelection}:ProcessProps) => {

    return (
        <ProcessWrapper>
            <ProcessBar>
                <ProcessInfo regionName={region?.name}>
                    {region?.name || "시/도"}
                </ProcessInfo>
                <Arrow/>
                <ProcessInfo regionName={city?.name}>
                    {city?.name || "군/구"}
                </ProcessInfo>
                <Arrow/>
                <ProcessInfo regionName={town?.name}>
                    {town?.name || "읍/면/동"}
                </ProcessInfo>
            </ProcessBar>
            <AddIcon onClick= {addSelection}/>
        </ProcessWrapper>
    );
};

export default Process;

const ProcessWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
margin-top: 20px;
`

const ProcessBar = styled.div`
width: 75%;
color:#BBBBBB;
background-color: #444444;
height: 48px;
display: flex;
flex-direction: row;
justify-content:center;
align-items: center;
border-radius: 12px;
`

const ProcessInfo = styled.div<{regionName?:string}>`
cursor: pointer;
width: 30%;
font-size: 12px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: ${(props) => (props.regionName ? "white" : "#BBBBBB")};
`

const Arrow = styled.div`
background-image: url('/images/arrow.png');
width: 4px;
height: 8px;
background-position: center;
background-size: cover;
`

const AddIcon = styled.div`
cursor: pointer;
background-image: url('/images/plus.png');
width: 48px;
height: 48px;
background-position: center;
background-size: cover;
transition: transform 0.1s;
&:active{
    transform: scale(0.9);
}
`
// const ProgressDiv = styled.div<{isSelect:boolean}>`
// cursor: pointer;
// width: 30%;
// font-size: 10px;
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// color: ${(props)=>(props.isSelect) ? "white" : "#BBBBBB"};
// pointer-events: ${(props)=>(props.isSelect ? "auto" : "none")};
// `