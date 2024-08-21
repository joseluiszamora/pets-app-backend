import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto, LoginUserDto } from "..";

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract getUsers(): Promise<Array<UserEntity>>;
}
