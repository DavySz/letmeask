import { createContext, ReactNode, useEffect, useState } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../services/firebase"

type UserType = {
    id: string;
    name: string;
    avatar: string
}

type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>
}
type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const {
                    displayName,
                    photoURL,
                    uid
                } = user
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account')
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider)

        if (result.user) {
            const {
                displayName,
                photoURL,
                uid
            } = result.user
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account')
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}