
export const objectFieldChange = (root: any, target: any) => {

    let newObject: object = {};
    Object.keys(target).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(root, key)) {
            if (target[key] instanceof Date) {
                if (typeof root[key] === "string") {
                    if (target[key] === new Date(root[key])) {
                        newObject = {...newObject, [key]: target[key]};
                    }
                }
            }
            if (root[key] !== target[key] && target[key]) {
                newObject = {...newObject, [key]: target[key]};
            }
        }
        else {
            newObject = {...newObject, [key]: target[key]};
        }
    });
    return newObject;
}

export const isEqual = (source: object, target: object) => {
    
    const ok = Object.keys, tx = typeof source, ty = typeof target;
    return source && target && tx === 'object' && tx === ty ? (
      ok(source).length === ok(target).length &&
        ok(source).every(key => isEqual(target[key], target[key]))
    ) : (source === target);
}

export const objectArrayChange = (sourceList: object[], targetList: object[]) => {

    if (sourceList.length !== targetList.length) return targetList;

    return sourceList.filter((value, index) => {
        if (isEqual(value, targetList[index])) return false;
        return true;
    })
}