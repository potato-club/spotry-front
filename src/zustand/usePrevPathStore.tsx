import { create } from 'zustand';

interface PrevPathState{
    prevPath:string,
    setPrevPath:(path:string) => void,
}

export const usePrevPathStore = create<PrevPathState>((set) => ({
    prevPath: "/main",
    setPrevPath: (path) => set(()=>({prevPath:path}))
}));