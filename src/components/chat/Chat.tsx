
import Input from "../form/Input";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { chatConnection } from "./chatConnection";
import { toast } from "react-toastify";

type MessageProps = {
    name: string;
    message: string;
    date: Date;
}

function Chat() {
    const notify = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages: MessageProps[] = [];

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (chatConnection.state !== "Connected") {
                notifyError("Chat er ikke forbundet. Prøv igen senere.");
                return;
            }

            chatConnection.invoke( //send sends message to the server
                  "SendMessage",
                  e.currentTarget.value,
                );

            e.currentTarget.value = ''; // Clear input after sending
        }
    }

    useEffect(() => {
        if (chatConnection.state === "Disconnected") {
            chatConnection
                .start()
                .then(() => notify("Chat forbundet!"))
                .catch((error) => notifyError(`Fejl ved forbindelse til Chat: ${error}`));
        }
    }, []);

    useEffect(() => {
        // Listen for incoming messages from the server
        chatConnection.on("ReceiveMessage", (name: string, message: string, date: Date) => {
            messages.push({ name, message, date });
        });

        return () => {
            chatConnection.off("ReceiveMessage");
        };
    }, []);

    // Scroll when messages array changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full max-h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg: MessageProps, index) => (
                    <Message key={index} username={msg.name} text={msg.message} date={msg.date} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-800">
                <Input type="text" placeholder="Skriv en besked..." onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}

export default Chat