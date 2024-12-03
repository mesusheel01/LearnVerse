import { atom } from "recoil"


export const usernameAtom = atom({
    key:'username',
    default: ''
})

export const emailAtom = atom({
    key:'email',
    default: ''
})

export const passwordAtom = atom({
    key:'password',
    default: ''
})

export const liveInputAtom = atom({
    key:'live-input',
    default: ""
})
