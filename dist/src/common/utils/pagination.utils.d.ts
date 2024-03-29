export interface PaginateOutput<T> {
    data: T[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        totalPerPage: number;
        prevPage: number | null;
        nextPage: number | null;
    };
}
export declare const paginate: (query: any) => {
    skip: number;
    take: number;
};
export declare const paginateOutput: <T>(data: T[], total: number, query: any) => PaginateOutput<T>;
