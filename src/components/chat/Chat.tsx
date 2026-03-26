
import Input from "../form/Input";
import Message from "./Message";
import { useEffect, useRef } from "react";



function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            alert("Send message: " + e.currentTarget.value); // TODO: send message to backend
            e.currentTarget.value = ''; // Clear input after sending
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <div className="flex flex-col h-full max-h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <Message username="handburger" text="Wow, det her kasino er virkelig fedt! Elsker det!" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <Message username="nesben" text="Det fedeste kasino nogensinde! Har aldirg prøvet nogen lignende" date={new Date()} />
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-800">
                <Input type="text" placeholder="Skriv en besked..." onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}

export default Chat