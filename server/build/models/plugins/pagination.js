"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = exports.customFindAndCountAll = exports.rawQuerySequelize = exports.defaultPagination = exports.filterPagination = exports.filterAll = exports.parseOrderParams = exports.parsePaginationParams = exports.PAGE_SIZE = exports.safeParseInt = void 0;
function safeParseInt(input, defaultValue = 0) {
    if (!input || typeof input === "number") {
        return Math.floor(input || defaultValue);
    }
    try {
        return parseInt(input, 10);
    }
    catch (_a) {
        return defaultValue;
    }
}
exports.safeParseInt = safeParseInt;
exports.PAGE_SIZE = 20;
function parsePaginationParams(input) {
    input = Object.assign({}, input);
    return {
        page: safeParseInt(input.page, 1),
        size: safeParseInt(input.size, exports.PAGE_SIZE),
        order: !input.order
            ? [["id", "DESC"]]
            : input.order.substring(0, 1) === "-"
                ? [[input.order.substring(1), "DESC"]]
                : [[input.order, "ASC"]],
    };
}
exports.parsePaginationParams = parsePaginationParams;
function parseOrderParams(input) {
    function parseItem(item) {
        return item.substring(0, 1) === "-"
            ? [item.substring(1), "DESC"]
            : [item, "ASC"];
    }
    const type = typeof input;
    if (type === "string") {
        return [parseItem(input)];
    }
    return input.map(parseItem);
}
exports.parseOrderParams = parseOrderParams;
function filterAll(modelClass, queryParams, pagingParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = Object.assign({}, pagingParams);
        const query = Object.assign(Object.assign({}, queryParams), { order: queryParams.order ? queryParams.order : options.order });
        const data = yield modelClass.findAll(query);
        return {
            data,
            pagination: {
                total: data.length,
                size: data.length,
                totalPages: 1,
                page: 1,
            },
        };
    });
}
exports.filterAll = filterAll;
function filterPagination(modelClass, queryParams, pagingParams, optionsFilters) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!pagingParams || (!pagingParams.page && !pagingParams.size)) {
            return filterAll(modelClass, queryParams, pagingParams);
        }
        const page = pagingParams && pagingParams.page ? safeParseInt(pagingParams.page, 1) : 1;
        const options = Object.assign(Object.assign({ offset: 0 }, pagingParams), { page: page > 1 ? page : 1, limit: pagingParams && pagingParams.size
                ? safeParseInt(pagingParams.size, exports.PAGE_SIZE)
                : exports.PAGE_SIZE });
        options.offset = options.offset || (options.page - 1) * options.limit;
        const query = Object.assign(Object.assign({}, queryParams), { order: queryParams.order || options.order, limit: options.limit, offset: options.offset });
        let results = {};
        results =
            optionsFilters && optionsFilters.customQuery
                ? yield optionsFilters.customQuery(modelClass, query)
                : yield modelClass.findAndCountAll(query);
        if (results.rows.length === 0) {
            return defaultPagination(options.limit, options.page);
        }
        const totalPages = results.count % options.limit === 0
            ? results.count / options.limit
            : Math.floor(results.count / options.limit) + 1;
        return {
            data: results.rows,
            pagination: {
                totalPages,
                page: options.page || 1,
                total: results.count,
                size: options.limit,
            },
        };
    });
}
exports.filterPagination = filterPagination;
function defaultPagination(size = exports.PAGE_SIZE, page = 1) {
    return {
        data: [],
        pagination: {
            page,
            size,
            total: 0,
            totalPages: 0,
        },
    };
}
exports.defaultPagination = defaultPagination;
function rawQuerySequelize(query) {
    return query.replace("Executing (default): ", "");
}
exports.rawQuerySequelize = rawQuerySequelize;
function customFindAndCountAll(modelClass, queryParams, pagingParams, optionsFilters) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!pagingParams || (!pagingParams.page && !pagingParams.size)) {
            return filterAll(modelClass, queryParams, pagingParams);
        }
        const page = pagingParams && pagingParams.page ? safeParseInt(pagingParams.page, 1) : 1;
        const options = Object.assign(Object.assign({ offset: 0 }, parsePaginationParams(pagingParams)), { page: page > 1 ? page : 1, limit: pagingParams && pagingParams.size
                ? safeParseInt(pagingParams.size, exports.PAGE_SIZE)
                : exports.PAGE_SIZE });
        options.offset = options.offset || (options.page - 1) * options.limit;
        const findAllAndCount = (m, q) => __awaiter(this, void 0, void 0, function* () {
            const rows = yield m.findAll(Object.assign(Object.assign({}, queryParams), { order: queryParams.order || options.order, limit: options.limit, offset: options.offset }));
            const count = yield m.count(Object.assign(Object.assign({}, q), optionsFilters));
            return { count, rows };
        });
        let results = {};
        results = yield findAllAndCount(modelClass, queryParams);
        if (results.rows.length === 0) {
            return defaultPagination(options.limit, options.page);
        }
        const totalPages = results.count % options.limit === 0
            ? results.count / options.limit
            : Math.floor(results.count / options.limit) + 1;
        return {
            data: results.rows,
            pagination: {
                totalPages,
                page: options.page || 1,
                total: results.count,
                size: options.limit,
                totalPerPage: results.rows.length,
            },
        };
    });
}
exports.customFindAndCountAll = customFindAndCountAll;
function calculatePagination(count, length, limit, page) {
    limit = safeParseInt(limit);
    page = safeParseInt(page);
    const totalPages = count % limit === 0 ? count / limit : Math.floor(count / limit) + 1;
    return {
        totalPages,
        page: page || 1,
        total: count,
        size: limit,
        totalPerPage: length,
    };
}
exports.calculatePagination = calculatePagination;
//# sourceMappingURL=pagination.js.map