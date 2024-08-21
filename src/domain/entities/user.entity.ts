export class UserEntity {
  constructor(
    public id: string,
    public fk_profile: number,
    public document: string,
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string,
    public avatar: string
  ) {}
}
/*
public id: string,
public fk_profile: string,
public document: string,
public email: string,
public password: string,
public first_name: string,
public last_name: string,
public avatar: string 
public logins: string,  
public last_login: string,
public is_active: string,
public created_by: string,
public updated_by: string,
public deleted_by: string,
public is_cashier: boolean,
public is_superviser: boolean

 */
