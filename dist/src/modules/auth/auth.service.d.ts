import { User } from "@prisma/client";
import { PrismaService } from "../../core/services/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginResponse } from "./interfaces/users-login.interface";
export declare class AuthService {
    private prisma;
    jwtService: JwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerUser(createUserDto: CreateUserDto): Promise<User>;
    loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    refreshToken(token: string): Promise<{
        access_token: string;
    }>;
    deleteUser(id: number): Promise<string>;
}
