"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
//# sourceMappingURL=pick.js.map