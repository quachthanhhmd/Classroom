"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUserProfile = exports.serializeUserLogin = void 0;
const serializeUserLogin = (model) => {
    return {
        user: {
            id: model.user.id,
            email: model.user.email,
            firstName: model.user.firstName,
            lastName: model.user.lastName,
            gender: model.user.gender,
            birthDay: model.user.birthDay,
            avatarUrl: model.user.avatarUrl,
        },
        token: model.token,
    };
};
exports.serializeUserLogin = serializeUserLogin;
const serializeUserProfile = (model) => {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        birthDay: model.birthDay,
        gender: model.gender,
        avatrUrl: model.avatarUrl,
    };
};
exports.serializeUserProfile = serializeUserProfile;
//# sourceMappingURL=user.interface.js.map