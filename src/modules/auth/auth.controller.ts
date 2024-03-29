// auth/auth.controller.ts
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthService } from "./auth.service";
import { User } from "@prisma/client";
import { LoginResponse } from "./interfaces/users-login.interface";
import { Public } from "../../common/decorators/public.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    // call users service method to login user
    return this.authService.loginUser(loginUserDto);
  }

  @Public()
  @Post("register")
  @ApiOperation({
    summary: "Register a new user",
    operationId: "create",
  })
  @ApiResponse({
    status: 201,
    description: "Created",
    type: CreateUserDto,
  })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 409,
    description: "Conflict",
    schema: {
      example: {
        message: "Email already registered",
        error: "Conflict",
        statusCode: 409,
      },
    },
  })
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // call users service method to register new user
    return this.authService.registerUser(createUserDto);
  }

  @Post("refresh-token")
  async refreshToken(@Req() req: any) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException("Authorization header not found");
    }
    const token = req.headers.authorization.split(" ")[1];
    return this.authService.refreshToken(token);
  }

  @Delete(":id")
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<string> {
    // call users service method to delete user
    return this.authService.deleteUser(+id);
  }
}
