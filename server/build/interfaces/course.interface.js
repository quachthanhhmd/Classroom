"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCourseDetail = exports.serializeCourseList = exports.serializeCourseInfor = exports.serializeCourseSummary = void 0;
const lodash_1 = require("lodash");
const serializeCourseSummary = (model) => {
    if (!model)
        return null;
    return {
        id: model.id,
        name: model.name,
        topic: model.topic,
        avatarUrl: model.avatarUrl
    };
};
exports.serializeCourseSummary = serializeCourseSummary;
const serializeCourseInfor = (model) => {
    if (!model)
        return null;
    return {
        id: model.id,
        name: model.name,
        description: model.description,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        backgroundUrl: model.backgroundUrl,
    };
};
exports.serializeCourseInfor = serializeCourseInfor;
const serializeCourseList = (model) => {
    return {
        courses: (0, lodash_1.get)(model, "data", []).map(exports.serializeCourseInfor),
        pagination: model.pagination,
    };
};
exports.serializeCourseList = serializeCourseList;
const serializeCourseDetail = (model) => {
    return {
        id: model.id,
        name: model.name,
        code: model.code,
        description: model.decription,
        topic: model.topic,
        avatarUrl: model.avatarUrl,
        backgroundUrl: model.backgroundUrl,
        studentExist: model.studentExist,
        studentLimit: model.studentLimit,
    };
};
exports.serializeCourseDetail = serializeCourseDetail;
//# sourceMappingURL=course.interface.js.map