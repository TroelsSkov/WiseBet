interface ModalProps {
    visible: boolean;
    title: string;
    children: React.ReactNode;
}

function Modal({ visible, title, children }: ModalProps) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center rounded z-50">
            <div className="bg-gray-800 rounded p-8">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="mb-4">This is a modal content.</p>
                {children}
            </div>
        </div>
    )
}

export default Modal