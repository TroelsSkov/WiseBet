import { useEffect } from "react";

// https://dev.to/adrianknapp/managing-application-state-with-custom-events-in-react-a-simple-yet-powerful-approach-ngd
export interface SaldoChangedEvent {
    'saldo-event': {}
}

export const triggerSaldoEvent = <Eventname extends keyof SaldoChangedEvent>(
    eventName: Eventname,
    data: SaldoChangedEvent[Eventname]
) => {
    const event = new CustomEvent(eventName, { detail: data })
    document.dispatchEvent(event);
}

export function useEventListener<T extends keyof SaldoChangedEvent>(
    eventName: T,
    handler: (detail: SaldoChangedEvent[T]) => void
) {
    useEffect(() => {
        const eventHandler = (event: CustomEvent<SaldoChangedEvent[T]>) => {
            handler(event.detail)
        }

        document.addEventListener(eventName, eventHandler as EventListener)
        return () => {
            document.removeEventListener(eventName, eventHandler as EventListener)
        }
    }, [eventName, handler])
}