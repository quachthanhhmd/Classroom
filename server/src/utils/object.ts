export const isAllNullObject = (item: any) => {
    return Object.values(item).every((value) => {
        if (value === null) {
            return false;
        }

        return true;
    });
}

export function standardizedObjectArr<T>(model: T[] | any): T[] {

    if (Array.isArray(model)) {

        return model.filter((item) => {
            return isAllNullObject(item);
        })
    }

    if (typeof model === "object" && !isAllNullObject(model)) {
        console.log(123);

        return [model];
    }

    return [];
}