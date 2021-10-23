export class ProjectTaskPost {
  constructor(
    public name: string,
    public users: string[],
    public startDate: any,
    public endDate: any,
    public note: string,
    public parentId: string
  ) {}
}
