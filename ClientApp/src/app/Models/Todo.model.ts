import { User } from './User.model';

export class Todo {
  constructor(
    public name: string,
    public order: number,
    public users: User[],
    public title: boolean,
    public checked: boolean,
    public note: string,
    public editing?: boolean,
    public menuOpen?: boolean
  ) {}
}
