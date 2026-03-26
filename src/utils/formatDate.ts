/**
 * Formats a date to a string in the format of "HH:mm" in the en-US locale
 * 
 * @param value The date to format
 * @returns Formatted date in en-US locale
 */
export const formatDateHM = (value: Date): string => {
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(value);
};