export const compareDate = (sourceDate: Date, targetDate: Date): number => {

    if (new Date(sourceDate) > new Date(targetDate)) return 1;
    if (new Date(targetDate) < new Date(targetDate)) return -1;

    return 0;
}