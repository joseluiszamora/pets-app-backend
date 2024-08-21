import { PrismaClient } from "@prisma/client";

import { BcryptAdapter } from "../../config";

import {
  AuthDataSource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { profile } from "console";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw CustomError.badRequest("User does not exists - email");

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Password is not valid");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getUsers(): Promise<Array<UserEntity>> {
    try {
      const users = await prisma.user.findMany();

      var usersList = Array<UserEntity>();

      for (const user of users) {
        usersList.push(UserMapper.userEntityFromObject(user));
      }

      return usersList;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const {
      fk_profile,
      document,
      email,
      password,
      first_name,
      last_name,
      avatar,
    } = registerUserDto;

    try {
      // 1. Verificar si el document existe
      const exists = await prisma.user.findUnique({
        where: {
          document,
        },
      });
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Verificar si el profile existe
      const profile = await prisma.profile.findUnique({
        where: {
          id: Number(fk_profile),
        },
      });
      if (!profile) throw CustomError.badRequest("El perfil no existe");

      // 2. Hashear la contraseña
      // 3. Crear usuario en la DB
      const user = await prisma.user.create({
        data: {
          document,
          email,
          first_name,
          last_name,
          password: this.hashPassword(password),
          avatar,
          profiles: {
            connect: {
              id: Number(fk_profile), // aca se fuerza el number, por que da errores por recibir string, revisar
            },
          },
        },
        include: {
          profiles: true,
        },
      });

      console.log(user);

      // 4. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw CustomError.badRequest(
            "Datos no validos,ya existe un usuario con el documento o correo"
          );
        }
        console.log(error);
      }
      if (error instanceof PrismaClientValidationError) {
        console.log(error);
        throw CustomError.badRequest(
          "Datos no validos, problemas en la validacion"
        );
      }
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
