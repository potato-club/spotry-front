import { useState } from "react";

const useClickSearchInput = () => {

    const [clickSearchInput,setClickSearchInput] = useState('');

    const UpdateInput = (input:string) => {
        setClickSearchInput(input);
    };

    return {
        clickSearchInput,
        UpdateInput,
    };
};

export default useClickSearchInput;