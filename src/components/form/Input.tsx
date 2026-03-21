type inputType = 'text' | 'password' | 'email' | 'number'

interface InputProps {
    type: inputType;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({ type = 'text', onChange, value, placeholder, onKeyDown }: InputProps) {
    return (
        <input
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className="rounded border border-gray-800 p-2 w-full"
        />
    )
}


export default Input