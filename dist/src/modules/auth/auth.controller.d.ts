import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthService } from "./auth.service";
import { User } from "@prisma/client";
import { LoginResponse } from "./interfaces/users-login.interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    registerUser(createUserDto: CreateUserDto): Promise<User>;
    refreshToken(req: any): Promise<{
        access_token: string;
    }>;
    deleteUser(id: number): Promise<string>;
}
