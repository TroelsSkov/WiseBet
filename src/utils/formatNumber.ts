/**
 * Formats a number to the danish locale version with thousand seperator and decimal points
 * 
 * @param value The number to format
 * @returns Formatted number in danishe locale
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('da-DK').format(value);
};