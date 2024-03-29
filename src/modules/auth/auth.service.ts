// auth/auth.service.ts
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../core/services/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { compare, hash } from "bcryptjs";
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginResponse, UserPayload } from "./interfaces/users-login.interface";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, public jwtService: JwtService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // create new user using prisma client
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: await hash(createUserDto.password, 10), // hash user's password
          name: createUserDto.name,
        },
      });

      // remove password from response
      delete newUser.password;

      return newUser;
    } catch (error) {
      // check if email already registered and throw error
      if (error.code === "P2002") {
        throw new ConflictException("Email already registered");
      }

      // throw error if any
      throw new HttpException(error, error.status);
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      // find user by email
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email },
      });

      // I check if user exists
      if (!user) {
        throw new NotFoundException("User not found");
      }

      // I check if password is correct by comparing it with the hashed password in the database
      if (!(await compare(loginUserDto.password, user.password))) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const payload: UserPayload = {
        // create payload for JWT
        sub: user.id, // sub is short for subject. It is the user id
        email: user.email,
        name: user.name,
      };

      return {
        // return access token
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.verify(token);
    return { access_token: this.jwtService.sign(payload) };
  }

  async deleteUser(id: number): Promise<string> {
    try {
      // find user by id. If not found, throw error
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      // delete user using prisma client
      await this.prisma.user.delete({
        where: { id },
      });

      return `User with id ${user.id} deleted`;
    } catch (error) {
      // check if user not found and throw error
      if (error.code === "P2025") {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
