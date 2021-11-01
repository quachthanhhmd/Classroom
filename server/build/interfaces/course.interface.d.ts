export interface ICreateCourse {
    name: string;
    description?: string;
    topic?: string;
    studentLimit: number;
}
export interface IUpdateCourse {
    name?: string;
    description?: string;
    topic?: string;
    studentLimit?: string;
    avatarUrl?: string;
    backgroundUrl?: string;
}
export interface ICourseInfor {
    id: number;
    name: string;
    description: string;
    topic: string;
    avatarUrl: string;
    backgroundUrl: string;
}
export interface ICourseSummary {
    id: number;
    name: string;
    topic: string;
    avatarUrl: string;
}
export declare const serializeCourseSummary: (model: any) => ICourseSummary | null;
export declare const serializeCourseInfor: (model: any) => ICourseInfor | null;
export declare const serializeCourseList: (model: any) => {
    courses: any;
    pagination: any;
};
export declare const serializeCourseDetail: (model: any) => {
    id: any;
    name: any;
    code: any;
    description: any;
    topic: any;
    avatarUrl: any;
    backgroundUrl: any;
    studentExist: any;
    studentLimit: any;
};
