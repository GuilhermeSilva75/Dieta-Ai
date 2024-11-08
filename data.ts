import { create } from 'zustand'

export type User = {
    name: string
    weight: string
    age: string
    height: string
    level: string
    gender: string
    objective: string
}

type DataState = {
    user: User
    setPageOne: (data: Omit<User, "gender" | "level" | "objective">) => void
    setPageTwo: (data: Pick<User, "gender" |  "level" | "objective">) => void
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        age: "",
        gender: "",
        height: "",
        level: "",
        name: "",
        objective: "",
        weight: ""
    },
    setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })),
    setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } }))
}))