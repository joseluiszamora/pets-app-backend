import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const {
      id,
      fk_profile,
      document,
      email,
      first_name,
      last_name,
      password,
      avatar,
    } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!document) throw CustomError.badRequest("Missing document");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");

    if (!first_name) throw CustomError.badRequest("Missing first name");
    if (!last_name) throw CustomError.badRequest("Missing last name");

    // if (!avatar) throw CustomError.badRequest("Missing avatar");

    return new UserEntity(
      id,
      fk_profile,
      document,
      email,
      password,
      first_name,
      last_name,
      avatar
    );
  }
}
