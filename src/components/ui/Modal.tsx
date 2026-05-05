interface ModalProps {
    visible: boolean;
    title: string;
    children: React.ReactNode;
}

function Modal({ visible, title, children }: ModalProps) {
    if (!visible) return null;

    return (
        <div className="fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* Modal content */}
                <div className="relative bg-gray-900 border border-gray-700 rounded-base shadow-sm p-4 md:p-6">
                    {/* Modal header */}
                    <div className="flex items-center justify-between border-b border-gray-700 pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading text-center">
                            {title}
                        </h3>
                    </div>
                    {/* Modal body */}
                    <div className="py-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal