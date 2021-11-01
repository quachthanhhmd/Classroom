import { FindAndCountOptions, Order } from "sequelize";
import { Model } from "sequelize-typescript";
export declare function safeParseInt(input: string | number, defaultValue?: number): number;
export interface IPaginationRequest extends Request {
    query: IPagingParams;
}
export interface IPagingParams {
    page?: string | number;
    size?: string | number;
    order?: Order;
    search?: string;
}
export interface IPaginationInfo {
    page: number;
    size: number;
    totalPages: number;
    total: number;
}
export interface IPagingResult<T> {
    data: T[];
    pagination: IPaginationInfo;
}
export declare const PAGE_SIZE = 20;
export declare function parsePaginationParams(input: any): IPagingParams;
export declare function parseOrderParams(input: any): Order;
export declare function filterAll<T extends Model<any, any>>(modelClass: (new () => T) & typeof Model, queryParams: FindAndCountOptions, pagingParams: IPagingParams): Promise<IPagingResult<T>>;
export interface IOptionFilterPagination<T> {
    customQuery?: (model: (new () => T) & typeof Model, query: any) => Promise<any>;
}
export declare function filterPagination<T extends Model>(modelClass: (new () => T) & typeof Model, queryParams: FindAndCountOptions, pagingParams: IPagingParams, optionsFilters?: IOptionFilterPagination<T>): Promise<IPagingResult<T>>;
export declare function defaultPagination(size?: number, page?: number): {
    data: never[];
    pagination: {
        page: number;
        size: number;
        total: number;
        totalPages: number;
    };
};
export declare function rawQuerySequelize(query: any): any;
export declare function customFindAndCountAll(modelClass: any, queryParams: any, pagingParams: any, optionsFilters: any): Promise<IPagingResult<Model<any, any>> | {
    data: any;
    pagination: {
        totalPages: number;
        page: number;
        total: any;
        size: number;
        totalPerPage: any;
    };
}>;
export declare function calculatePagination(count: any, length: any, limit: any, page: any): {
    totalPages: number;
    page: any;
    total: any;
    size: any;
    totalPerPage: any;
};
