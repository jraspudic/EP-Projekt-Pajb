import { User } from './User.model';

export class Todo {
  constructor(
    public customId: number,
    public name: string,
    public order: number,
    public users: User[],
    public title: boolean,
    public checked: boolean,
    public note: string
  ) {}
}
