// IPayload Interface
export interface IPayload<T, K = unknown> {
    data: T;
    cb?: (job?: K) => void;
}

export const DEFAULT_PER_PAGE = 15;

export interface IPagination {
    page?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    totalResults?: number;
    perPage?: number;
}

export interface IPaginatedResponse<T> {
    data: T[];
    meta: IPagination;
}

export enum ORDER {
    ASC = "asc",
    DESC = "desc",
}

export interface FetchPayload {
    order?: ORDER;
    orderBy?: string;
    page?: number;
}
export interface IDepartment {
    name: string;
    companyId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}
