type inputType = 'text' | 'password' | 'email' | 'number'

interface InputProps {
    type?: inputType;
    id?: string;
    name?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({ type = 'text', id, name, required, onChange, value, placeholder, onKeyDown }: InputProps) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            required={required}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className="rounded border border-gray-800 p-2 w-full text-white"
        />
    )
}


export default Input