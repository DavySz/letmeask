import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { database } from '../services/firebase'
import { push, ref } from "firebase/database";
import { Button } from '../components/Button'
import { useAuth } from '../Hooks/useAuth'
import '../styles/auth.scss'

export function NewRoom() {
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()
    const { user } = useAuth()

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        if (newRoom.trim() === '') {
            return
        }
        const roomRef = ref(database, 'rooms')
        const firebaseRoom = await push(roomRef, {
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" id='img-aside' />
                <strong id='strong-aside'>Crie salas de Q&amp;A ao-vivo</strong>
                <p id='p-aside'>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" id='img-content' />
                    <h2>Criar uma nova sala</h2>
                    <form id='form-content' onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            id='input-form-content'
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button
                            type="submit"
                            id='button-input-form'
                        >
                            Criar sala
                        </Button>
                    </form>
                    <p id='p-main-content'>Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}