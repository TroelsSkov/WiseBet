interface SignalRArguments {
    // Placeholder
}

interface SignalRResponse {
    type: string;
    target?: string;
    arguments?: SignalRArguments[];
}

export { SignalRResponse, SignalRArguments };