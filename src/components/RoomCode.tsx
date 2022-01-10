import CopyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode({ code }: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={CopyImg} alt="Copy room code to clipboard" />
            </div>
            <span>{code}</span>
        </button>
    )
}