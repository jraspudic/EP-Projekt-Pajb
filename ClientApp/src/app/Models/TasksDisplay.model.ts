import { Todo } from './Todo.model';
import { User } from './User.model';

export class TasksDisplay {
  constructor(
    public _id: string,
    public name: string,
    public users: User[],
    public startDate: Date,
    public endDate: Date,
    public note: string,
    public parentId: string,
    public projectAdmin: string,
    public tasks?: TasksDisplay[],
    public todos?: Todo[]
  ) {}
}
