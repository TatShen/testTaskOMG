import {create} from 'zustand';

const EnterStore = create((set) => ({
   enter:[],
   setEnter: (newEnter) => set((state) => ({ enter: [...state.enter, newEnter] }))
}));


export default EnterStore