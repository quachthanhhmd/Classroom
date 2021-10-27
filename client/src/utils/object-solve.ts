
export const objectFieldChange = (root: any, target: any) => {

    let newObject: object = {};
    Object.keys(target).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(root, key)) {
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