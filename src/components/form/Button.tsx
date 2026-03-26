type ButtonVariant = 'solid' | 'pill' | 'round'
type ButtonColor = 'default' | 'green' | 'indigo'

interface ButtonProps {
    variant?: ButtonVariant;
    color?: ButtonColor;
    onClick?: () => void;
    children: React.ReactNode;
}

function Button({ variant = 'solid', color = 'default', onClick, children }: ButtonProps) {
    const variantStyles: Record<ButtonVariant, string> = {
        solid: 'rounded px-4 py-2',
        pill: 'rounded-full px-4 py-2',
        round: 'rounded-full px-3 py-2',
    }

    const colorStyles: Record<ButtonColor, string> = {
        default: 'bg-gray-800 text-white hover:bg-gray-900',
        green: 'bg-green-500 text-white hover:bg-green-600',
        indigo: 'bg-indigo-500 text-white hover:bg-indigo-600',
    }

    return (
        <button className={`flex h-full w-full items-center pointer ${variantStyles[variant]} ${colorStyles[color]}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button