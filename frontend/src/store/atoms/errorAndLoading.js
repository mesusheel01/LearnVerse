import { atom } from "recoil"


export const loadingAtom = atom({
    key:"loading",
    default: false
})


export const errorAtom = atom({
    key:"error",
    default: false
})
