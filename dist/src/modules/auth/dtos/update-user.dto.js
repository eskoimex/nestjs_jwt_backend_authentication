"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsertDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class UpdateUsertDto extends mapped_types_1.PartialType(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUsertDto = UpdateUsertDto;
//# sourceMappingURL=update-user.dto.js.map