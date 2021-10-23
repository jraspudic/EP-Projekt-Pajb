export class User {
  constructor(
    public _id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public token?: string,
    public fullName?: string
  ) {}
}
