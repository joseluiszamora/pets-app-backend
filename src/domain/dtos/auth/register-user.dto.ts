import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public fk_profile: number,
    public document: string,
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string,
    public avatar: string // public logins: string, // public last_login: string, // public is_active: string, // public created_by: string, // public updated_by: string, // public deleted_by: string, // public is_cashier: boolean, // public is_superviser: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      fk_profile,
      document,
      email,
      password,
      first_name,
      last_name,
      avatar,
      // logins,
      // last_login,
      // is_active,
      // created_by,
      // updated_by,
      // deleted_by,
      // is_cashier,
      // is_superviser,
    } = object;

    if (!fk_profile) return ["Missing fk_profile", undefined];
    if (!document) return ["Missing document", undefined];
    if (!Validators.email.test(email)) return ["Email is not valid", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password too short", undefined];
    if (!first_name) return ["Missing first_name", undefined];
    if (!last_name) return ["Missing last_name", undefined];
    // if (!avatar) return ["Missing avatar", undefined];
    // if (!logins) return ["Missing logins", undefined];
    // if (!last_login) return ["Missing last_login", undefined];
    // if (!is_active) return ["Missing is_active", undefined];
    // if (!created_by) return ["Missing created_by", undefined];
    // if (!updated_by) return ["Missing updated_by", undefined];
    // if (!deleted_by) return ["Missing deleted_by", undefined];
    // if (!is_cashier) return ["Missing is_cashier", undefined];
    // if (!is_superviser) return ["Missing is_superviser", undefined];

    return [
      undefined,
      new RegisterUserDto(
        fk_profile,
        document,
        email,
        password,
        first_name,
        last_name,
        avatar
        // logins,
        // last_login,
        // is_active,
        // created_by,
        // updated_by,
        // deleted_by,
        // is_cashier,
        // is_superviser
      ),
    ];
  }
}
