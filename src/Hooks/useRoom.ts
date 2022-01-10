import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { ref, onValue, off } from 'firebase/database';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
    },
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')
    const { user } = useAuth()
    useEffect(() => {
        const roomRef = ref(database, `rooms/${roomId}`)
        onValue(roomRef, (room) => {
            const databseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databseRoom.questions ?? {}
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })
            setTitle(databseRoom.title)
            setQuestions(parsedQuestions)
        })
        return () => {
            off(roomRef)
        }
    }, [roomId, user?.id])

    return {
        questions,
        title
    }
}


