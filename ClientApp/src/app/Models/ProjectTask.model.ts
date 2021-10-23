export class ProjectTask {
  constructor(
    public _id: string,
    public name: string,
    public users: any[],
    public startDate: any,
    public endDate: any,
    public note: string,
    public parentId: string,
    public projectAdmin: string
  ) {}
}
