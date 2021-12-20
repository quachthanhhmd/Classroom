import { FindAndCountOptions, Order, OrderItem } from "sequelize";
import { Model } from "sequelize-typescript";

export function safeParseInt(
  input: string | number,
  defaultValue = 0
): number {
  if (!input || typeof input === "number") {
    return <number> Math.floor(<number> input || defaultValue);
  }

  try {
    return parseInt(<string> input, 10);
  } catch {
    return defaultValue;
  }
}

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

export const PAGE_SIZE = 20;

export function parsePaginationParams(input: any): IPagingParams {
  input = { ...input };

  return {
    page: safeParseInt(input.page, 1),
    size: safeParseInt(input.size, PAGE_SIZE),
    order: !input.order
      ? [["id", "DESC"]]
      : (<string> input.order).substring(0, 1) === "-"
        ? [[(<string> input.order).substring(1), "DESC"]]
        : [[input.order, "ASC"]],
  };
}

export function parseOrderParams(input: any): Order {
  function parseItem(item): OrderItem {
    return (<string> item).substring(0, 1) === "-"
      ? [(<string> item).substring(1), "DESC"]
      : [item, "ASC"];
  }
  const type = typeof input;
  if (type === "string") {
    return [parseItem(input)];
  }

  return input.map(parseItem);
}

export async function filterAll<T extends Model<any, any>>(
  modelClass: (new () => T) & typeof Model,
  queryParams: FindAndCountOptions,
  pagingParams: IPagingParams
): Promise<IPagingResult<T>> {
  const options = { ...pagingParams };

  const query = {
    ...queryParams,
    order: queryParams.order ? queryParams.order : options.order,
  };

  const data: any[] = await modelClass.findAll(query);

  return {
    data,
    pagination: {
      total: data.length,
      size: data.length,
      totalPages: 1,
      page: 1,
    },
  };
}

export interface IOptionFilterPagination<T> {
  customQuery?: (
    model: (new () => T) & typeof Model,
    query: any
  ) => Promise<any>;
}

export async function filterPagination<T extends Model>(
  modelClass: (new () => T) & typeof Model,
  queryParams: FindAndCountOptions,
  pagingParams: IPagingParams,
  optionsFilters?: IOptionFilterPagination<T>
): Promise<IPagingResult<T>> {
  if (!pagingParams || (!pagingParams.page && !pagingParams.size)) {
    return filterAll<T>(modelClass, queryParams, pagingParams);
  }
  const page =
    pagingParams && pagingParams.page ? safeParseInt(pagingParams.page, 1) : 1;
  const options = {
    offset: 0,
    ...pagingParams,
    page: page > 1 ? page : 1,
    limit:
      pagingParams && pagingParams.size
        ? safeParseInt(pagingParams.size, PAGE_SIZE)
        : PAGE_SIZE,
  };

  options.offset = options.offset || (options.page - 1) * options.limit;
  const query = {
    ...queryParams,
    order: queryParams.order || options.order,
    limit: options.limit,
    offset: options.offset,
  };

  let results: any = {};
  results =
    optionsFilters && optionsFilters.customQuery
      ? await optionsFilters.customQuery(modelClass, query)
      : await modelClass.findAndCountAll(query);

  if (results.rows.length === 0) {
    return defaultPagination(options.limit, options.page);
  }

  const totalPages =
    results.count % options.limit === 0
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
}

export function defaultPagination(size = PAGE_SIZE, page = 1) {
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

export function rawQuerySequelize(query) {
  return query.replace("Executing (default): ", "");
}

export async function customFindAndCountAll(
  modelClass,
  queryParams,
  pagingParams,
  optionsFilters
) {
  if (!pagingParams || (!pagingParams.page && !pagingParams.size)) {
    return filterAll(modelClass, queryParams, pagingParams);
  }
  const page =
    pagingParams && pagingParams.page ? safeParseInt(pagingParams.page, 1) : 1;
  const options = {
    offset: 0,
    ...parsePaginationParams(pagingParams),
    page: page > 1 ? page : 1,
    limit:
      pagingParams && pagingParams.size
        ? safeParseInt(pagingParams.size, PAGE_SIZE)
        : PAGE_SIZE,
  };
  options.offset = options.offset || (options.page - 1) * options.limit;
  const findAllAndCount = async (m, q) => {
    const rows = await m.findAll({
      ...queryParams,
      order: queryParams.order || options.order,
      limit: options.limit,
      offset: options.offset,
    });
    const count = await m.count({ ...q, ...optionsFilters });

    return { count, rows };
  };
  let results: any = {};
  results = await findAllAndCount(modelClass, queryParams);
  if (results.rows.length === 0) {
    return defaultPagination(options.limit, options.page);
  }
  const totalPages =
    results.count % options.limit === 0
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
}

export function calculatePagination(count, length, limit, page) {
  limit = safeParseInt(limit);
  page = safeParseInt(page);
  const totalPages =
    count % limit === 0 ? count / limit : Math.floor(count / limit) + 1;

  return {
    totalPages,
    page: page || 1,
    total: count,
    size: limit,
    totalPerPage: length,
  };
}
