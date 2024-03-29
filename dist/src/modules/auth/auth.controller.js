"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const login_user_dto_1 = require("./dtos/login-user.dto");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    loginUser(loginUserDto) {
        return this.authService.loginUser(loginUserDto);
    }
    async registerUser(createUserDto) {
        return this.authService.registerUser(createUserDto);
    }
    async refreshToken(req) {
        if (!req.headers.authorization) {
            throw new common_1.UnauthorizedException("Authorization header not found");
        }
        const token = req.headers.authorization.split(" ")[1];
        return this.authService.refreshToken(token);
    }
    async deleteUser(id) {
        return this.authService.deleteUser(+id);
    }
};
__decorate([
    public_decorator_1.Public(),
    common_1.Post("login"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    public_decorator_1.Public(),
    common_1.Post("register"),
    swagger_1.ApiOperation({
        summary: "Register a new user",
        operationId: "create",
    }),
    swagger_1.ApiResponse({
        status: 201,
        description: "Created",
        type: create_user_dto_1.CreateUserDto,
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Bad Request",
        schema: {
            example: {
                message: [
                    "email must be an email",
                    "email should not be empty",
                    "password should not be empty",
                    "name should not be empty",
                ],
                error: "Bad Request",
                statusCode: 400,
            },
        },
    }),
    swagger_1.ApiResponse({
        status: 409,
        description: "Conflict",
        schema: {
            example: {
                message: "Email already registered",
                error: "Conflict",
                statusCode: 409,
            },
        },
    }),
    common_1.Post("register"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    common_1.Post("refresh-token"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    common_1.Delete(":id"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
AuthController = __decorate([
    common_1.Controller("users"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map