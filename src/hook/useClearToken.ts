import { useEffect } from "react";
import { removeToken } from "../util/storage";

const useClearToken = () => {
    useEffect(() => {
        const handleUnload = (event: BeforeUnloadEvent) => {
            if (performance.navigation.type !== 1) {
                removeToken();
            }
        };
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("unload", handleUnload);
        };
    }, []);
};

export default useClearToken;