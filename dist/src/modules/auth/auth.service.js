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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/services/prisma.service");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerUser(createUserDto) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    password: await bcryptjs_1.hash(createUserDto.password, 10),
                    name: createUserDto.name,
                },
            });
            delete newUser.password;
            return newUser;
        }
        catch (error) {
            if (error.code === "P2002") {
                throw new common_1.ConflictException("Email already registered");
            }
            throw new common_1.HttpException(error, error.status);
        }
    }
    async loginUser(loginUserDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: loginUserDto.email },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            if (!(await bcryptjs_1.compare(loginUserDto.password, user.password))) {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
            const payload = {
                sub: user.id,
                email: user.email,
                name: user.name,
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async refreshToken(token) {
        const payload = this.jwtService.verify(token);
        return { access_token: this.jwtService.sign(payload) };
    }
    async deleteUser(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            await this.prisma.user.delete({
                where: { id },
            });
            return `User with id ${user.id} deleted`;
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            throw new common_1.HttpException(error, 500);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map