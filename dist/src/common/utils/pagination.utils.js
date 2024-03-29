"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateOutput = exports.paginate = void 0;
const common_1 = require("@nestjs/common");
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const paginate = (query) => {
    const size = Math.abs(parseInt(query.size)) || DEFAULT_PAGE_SIZE;
    const page = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
    return {
        skip: size * (page - 1),
        take: size,
    };
};
exports.paginate = paginate;
const paginateOutput = (data, total, query) => {
    const page = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
    const size = Math.abs(parseInt(query.size)) || DEFAULT_PAGE_SIZE;
    const lastPage = Math.ceil(total / size);
    if (!data.length) {
        return {
            data,
            meta: {
                total,
                lastPage,
                currentPage: page,
                totalPerPage: size,
                prevPage: null,
                nextPage: null,
            },
        };
    }
    if (page > lastPage) {
        throw new common_1.NotFoundException(`Page ${page} not found. Last page is ${lastPage}`);
    }
    return {
        data,
        meta: {
            total,
            lastPage,
            currentPage: page,
            totalPerPage: size,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < lastPage ? page + 1 : null,
        },
    };
};
exports.paginateOutput = paginateOutput;
//# sourceMappingURL=pagination.utils.js.map