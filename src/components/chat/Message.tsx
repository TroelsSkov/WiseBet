import { formatDateHM } from "../../utils/formatDate";

interface MessageProps {
    username: string;
    text: string;
    date: Date;
}

function Message({ username, text, date }: MessageProps) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold">{username}</p>
                <p className="text-sm font-light ml-auto">{formatDateHM(date)}</p>
            </div>
            <div className="bg-gray-800 rounded px-4 py-2">
                <p className="text-sm">{text}</p>
            </div>

        </div>
    )
}

export default Message