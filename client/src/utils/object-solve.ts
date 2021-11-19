
export const objectFieldChange = (root: any, target: any) => {

    let newObject: object = {};
    Object.keys(target).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(root, key)) {
            if (target[key] instanceof Date) {
                console.log(typeof root[key]);
                if (typeof root[key] === "string") {
                    console.log( new Date(root[key]), target[key])
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