import { atom } from "recoil";

export const tokenAtom = atom({
    key:'token',
    default: null
})

export const tokenExpiryAtom = atom({
    key:"token-expiry",
    default: null
})
