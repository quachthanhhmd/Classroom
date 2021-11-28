
export const objectFieldChange = (root: any, target: any) => {

    let newObject: object = {};
    Object.keys(target).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(root, key)) {
            if (target[key] instanceof Date) {
                if (typeof root[key] === "string") {
                    if (target[key] === new Date(root[key])) {
                        newObject = { ...newObject, [key]: target[key] };
                    }
                }
            }
            if (root[key] !== target[key] && target[key]) {
                newObject = { ...newObject, [key]: target[key] };
            }
        }
        else {
            newObject = { ...newObject, [key]: target[key] };
        }
    });
    return newObject;
}

export const isEqual = (source: object, target: object) => {

    return JSON.stringify(source) === JSON.stringify(target)
}

export const objectArrayChange = (sourceList: any[], targetList: any[]) => {
    if (sourceList.length !== targetList.length) return targetList;

    return sourceList.filter((value, index) => {
        const checkTargetValue = targetList.filter((targetValue, indexValue) => {
            return value.id === targetValue.id && !isEqual(targetValue, value);
        })
        if (checkTargetValue.length === 0) {
            return false;
        }
        return true;
    })
}