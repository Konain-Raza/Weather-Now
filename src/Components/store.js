import { create } from "zustand";

const useStore = create((set)=>({
    city: '',
    updateCity:(value) => set({city: value})
}))

export default useStore;