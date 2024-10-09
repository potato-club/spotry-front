import { create } from "zustand";


interface HouseAddress {
    city:string;
    district:string;
    neighbor:string;
}

interface LocationState{
    towns: HouseAddress[];
    setTown: (town:HouseAddress) => void;
    DeleteTown:(idx:number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    towns: [],
    setTown: (town:HouseAddress) => 
        set((state) => ({
            towns: [...state.towns, town],
        })),
    DeleteTown: (idx:number) => set((state) => ({
        towns: state.towns.filter((House,i) => i !== idx),
    }))
}));
